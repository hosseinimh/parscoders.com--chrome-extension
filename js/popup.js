import { fetchText, parseRSS } from "./utils.js";

const getProjects = async () => {
  const text = await fetchText();
  const rss = parseRSS(text);

  document.querySelector("#items").textContent = "";
  rss.querySelectorAll("item").forEach((item) => {
    addItem(item);
  });
};

const addItem = (item) => {
  const a = document.createElement("a");
  a.className = "item list-group-item list-group-item-action";
  a.textContent = item.querySelector("title").textContent;
  a.href = item.querySelector("link").textContent;
  a.target = "_blank";

  document.querySelector("#items").appendChild(a);
};

document.addEventListener("DOMContentLoaded", getProjects);
