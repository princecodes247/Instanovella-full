const signup = document.querySelector("#signup-form");

const sect1 = document.querySelector("#sect-1");
const sect2 = document.querySelector("#sect-2");
const sect3 = document.querySelector("#sect-3");
const sect4 = document.querySelector("#sect-4");

const next = document.querySelectorAll(".next-btn").forEach((nextBtn) => {
  nextBtn.addEventListener("click", (event) => {
    nextBtn.parentElement.classList.toggle("none");
    nextBtn.parentElement.nextElementSibling.classList.toggle("none");
  });
});
