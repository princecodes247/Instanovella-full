const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/settings/themes/"
    : "1";

let themes = ["light", "hacker", "dark", "pinky", "navy", "scifi"];

let body = document.querySelector("body");
let themeBtns = document.querySelectorAll(".theme-btn");

themeBtns.forEach((themeBtn) => {
  themeBtn.addEventListener("click", () => {
    console.log("hllo");
    let theme = themeBtn.querySelector("div:nth-child(1)").innerText;
    fetch(API_URL + theme)
      .then((res) => res.json())
      .then((content) => {
        themes.forEach((theme) => {
          body.classList.remove(theme);
        });
        console.log(content);
        body.classList.add(content.theme);
      })
      .catch((err) => console.log(err));
    //
    //
    //
  });
});
