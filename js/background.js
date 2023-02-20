import { getProjectCodes } from "./utils.js";

const updateBadge = () => {
  const codes = getProjectCodes();

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
setInterval(updateBadge, 10000);
