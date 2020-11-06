const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/books/"
    : "1";

function createStory(name, category, list, id) {
  let title = document.createElement("h4");
  title.innerText = name;
  let genre = document.createElement("h5");
  genre.innerText = category;
  let titleblock = document.createElement("div");
  titleblock.classList.add("title");
  titleblock.append(title);
  titleblock.append(genre);
  let cover = document.createElement("img");
  cover.src = "#"; //coverUrl
  cover.alt = "";

  let card = document.createElement("span");
  card.classList.add("card");
  card.append(cover);
  card.append(titleblock);

  let linker = document.createElement("a");
  linker.href = "/books/" + id;
  linker.append(card);

  let story = document.createElement("span");
  story.classList.add("story");
  story.append(linker);

  list.append(story);
}

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    let stories = data;
    const list = document.querySelector("#sec1 .stories");

    stories.forEach((story) => {
      createStory(story.title, story.genre, list, story._id);
    });
  });
