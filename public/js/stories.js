const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/books/"
    : window.location.origin + "/books/";
const categories = document.querySelector("#categories");
const loadmore = document.querySelector("#loadmore");
let numOfTries = 0;
let isLoading = false;
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

let limit = 5;
let page = 1;
let genres = [];

fetch(`${API_URL}/getgenres`)
  .then((res) => res.json())
  .then((data) => {
    genres = data.map((item) => {
      return {
        name: item,
        currPage: 1,
        hasMore: true,
      };
    });
    genrePicker();
  });

//For Trending
fetch(`${API_URL}`)
  .then((res) => res.json())
  .then((data) => {
    let stories = data.books;
    const list = document.querySelector("#sec1 .stories");

    stories.forEach((story) => {
      createStory(story.title, story.genre, list, story._id);
    });
  });

//For top story
fetch(`${API_URL}`)
  .then((res) => res.json())
  .then((data) => {
    let stories = data.books;

    stories.forEach((story) => {
      const card = document.querySelector(".intro .card");
      const cardTop = card.querySelector(".top ");
      const cardBottom = card.querySelector(".bottom ");
      cardTop.querySelector(".title h4").innerText = story.title
      cardTop.querySelector(".title h5").innerText = story.genre
      cardBottom.querySelector(".desc").innerText = story.desc


    });
  });

function genrePicker() {
  if (numOfTries < genres.length) {
    let index = Math.floor(Math.random() * genres.length);
    if (genres[index].hasMore) {
      let more = createList(genres[index].currPage, limit, genres[index].name);
      genres[index].currPage += limit;
      if (!more) {
        genres[index].hasMore = false;
      }
    } else {
      numOfTries += 1;
      genrePicker();
    }
  } else {
  }
  loadmore.style.visibility = "hidden";
}

function createList(page, limit, genre) {
  fetch(`${API_URL}?limit=${limit}&page=${page}&genre=${genre}`)
    .then((res) => res.json())
    .then((data) => {
      let stories = data.books;
      let article = document.createElement("article");
      let list = document.createElement("div");
      article.classList.add("stories");
      article.setAttribute("data-sect-name", genre);
      article.classList.add("sect");
      stories.forEach((story) => {
        createStory(story.title, story.genre, list, story._id);
      });
      article.append(list);
      categories.append(article);
      isLoading = false;
      if (data.hasMore) {
        return true;
      } else {
        return false;
      }
    });
}

document.addEventListener("scroll", () => {
  const rect = loadmore.getBoundingClientRect();
  if (rect.top < window.innerHeight && !isLoading) {
    isLoading = true;
    loadmore.style.visibility = "visible";
    console.log("loading");
    genrePicker();
  }
});
