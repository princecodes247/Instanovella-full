const API_URL = "http://localhost:5000/books/";
const bookUrl = window.location.href;
const starBtn = document.querySelector("#star-btn");
const stars = document.querySelector("#stars sub");
function starBook(id) {
  starBtn.disabled = true;
  starBtn.classList.add("disabled");

  fetch(id + "/star")
    .then((res) => res.json())
    .then((data) => {
      stars.innerText = data.stars + " Stars";
      if (data.message) {
        starBtn.innerText = "Unstar";
      } else {
        starBtn.innerText = "Star";
      }

      starBtn.classList.remove("disabled");
      starBtn.disabled = false;
      //let stories = data;
      //   const list = document.querySelector("#sec1 .stories");
      //   stories.forEach((story) => {
      //     createStory(story.title, story.genre, list, story._id);
      //   });
    });
}

starBtn.addEventListener("click", () => {
  starBook(bookUrl);
});
