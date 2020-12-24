const API_URL = window.location.origin + "/settings/themes/";

let themes = ["light", "hacker", "dark", "pinky", "navy", "scifi"];

let body = document.querySelector("body");
let themeBtns = document.querySelectorAll(".theme-btn");

themeBtns.forEach((themeBtn) => {
  themeBtn.addEventListener("click", () => {
    let theme = themeBtn.querySelector("div:nth-child(1)").innerText;
    console.log(API_URL + theme);
    console.log(theme);
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
