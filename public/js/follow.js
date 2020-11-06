const userUrl = window.location.href;
const followBtn = document.querySelector("#follow-btn");
const followers = document.querySelector("#followers #followers-num");
function follow(id) {
  followBtn.disabled = true;
  followBtn.classList.add("disabled");

  fetch(id + "/follow")
    .then((res) => res.json())
    .then((data) => {
      followers.innerText = data.followers || followers.innerText;
      if (data.message) {
        followBtn.value = "Unfollow";
      } else {
        followBtn.value = "Follow";
      }

      followBtn.classList.remove("disabled");
      followBtn.disabled = false;
    });
}

followBtn.addEventListener("click", () => {
  follow(userUrl);
});
