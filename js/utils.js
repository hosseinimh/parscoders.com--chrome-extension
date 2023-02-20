export const fetchText = async () => {
  const rss = await fetch("https://parscoders.com/project/rss");
  return await rss.text();
};

export const parseRSS = (text) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");

  return doc;
};
