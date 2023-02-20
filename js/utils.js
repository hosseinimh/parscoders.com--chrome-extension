export const fetchText = async () => {
  const rss = await fetch("https://parscoders.com/project/rss");
  return await rss.text();
};

export const parseRSS = (text) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");

  return doc;
};

export const getProjectCodes = async () => {
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

  return codes;
};
