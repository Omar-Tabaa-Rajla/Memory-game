import { backGroundAudio } from "./backGroundAudio.js";
// checking the matched blocks
export function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  // I'll select the the the flipped cards accourding to thier data custom (eg. data-animal="cat")
  if (firstBlock.dataset.animal == secondBlock.dataset.animal) {
    // if they are matched then romove the (is flipped) class and put instead (hat-match)
    // then after a half second play the success sound
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    // console.log("pingo");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    setTimeout(() => {
      document.getElementById("success").play();
    }, 500);
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1; // counting the tries
    // if the two cards aren't the same, the remove the (is-flipped) to make them turn back and the failure sound
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, 1000);
    setTimeout(() => {
      document.getElementById("failure").play();
    }, 500);
  }
  if (document.querySelectorAll(".has-match").length === 20) {
    backGroundAudio.pause();
    document.querySelector("#success").pause();
    setTimeout(() => {
      document.querySelector("#applause-sound").play();
    }, 1500);
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }
}
