console.log("hello");

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/books/create"
    : "1";

const form = document.querySelector("#create-form");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const category = document.querySelector("#category");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let bookDetails = new FormData(form);
  let bookAuthor = bookDetails.get("author");
  let bookTitle = bookDetails.get("title");
  let bookDesc = bookDetails.get("desc");
  let bookCateg = bookDetails.get("category");

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      title: bookTitle,
      desc: bookDesc,
      category: bookCateg,
    }),
  })
    .then((res) => res.json())
    .then((ret) => console.log(ret.message))
    .catch((err) => console.log(err));
});
