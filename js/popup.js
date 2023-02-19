const addItem = (item) => {
  const a = document.createElement("a");
  a.className = "item list-group-item list-group-item-action";
  a.textContent = item.querySelector("title").textContent;
  a.href = item.querySelector("link").textContent;
  a.target = "_blank";

  document.querySelector("#items").appendChild(a);
};

const getRSS = () => {
  fetch("https://parscoders.com/project/rss")
    .then((res) => {
      res.text().then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        document.querySelector("#items").textContent = "";
        doc.querySelectorAll("item").forEach((item) => {
          addItem(item);
        });
      });
    })
    .catch(() => {});

  setInterval(getRSS, 10000);
};

document.addEventListener("DOMContentLoaded", getRSS);
