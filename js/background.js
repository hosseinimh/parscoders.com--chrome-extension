import { fetchText } from "./utils.js";

const getProjects = async () => {
  const text = await fetchText();

  let index = text?.length > 0 ? 0 : -1;
  let codes = [];

  while (index !== -1) {
    index = text.indexOf("<link>https://parscoders.com/project/", index);

    if (index === -1) {
      break;
    }

    index += 37;
    const codesArray = text.substring(index).split("/");

    if (codesArray.length > 0 && !isNaN(codesArray[0])) {
      codes = [...codes, parseInt(codesArray[0])];
    }
  }

  chrome.storage.sync.get(["codes"], (data) => {
    let oldCodes = [];

    if (Array.isArray(data) && Array.isArray(data["codes"])) {
      oldCodes = data["codes"];
    }

    const storageCodes = [...new Set([...oldCodes, ...codes])];

    if (storageCodes.length > oldCodes.length) {
      chrome.action.setBadgeText({ text: storageCodes.length.toString() });
    }

    chrome.storage.sync.set({ ["codes"]: storageCodes });
  });
};

chrome.action.setBadgeBackgroundColor({ color: "green" });
setInterval(getProjects, 10000);
