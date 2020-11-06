/*const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/books/search?"
    : "1";

const searchBar = document.querySelctor("#search-form");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(searchBar);
  let search = formData.get("search");

  fetch(API_URL + new URLSearchParams(search))
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((err) => console.log(err));
});
*/
let storiesBtn = document.querySelector("#stories-option");
let peopleBtn = document.querySelector("#people-option");
let books = document.querySelector("#books");
let people = document.querySelector("#people");
console.log("hiiiiii");
peopleBtn.addEventListener("click", () => {
  books.classList.add("none");
  people.classList.remove("none");
});

storiesBtn.addEventListener("click", () => {
  books.classList.remove("none");
  people.classList.add("none");
});
