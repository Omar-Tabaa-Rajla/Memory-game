import { backGroundAudio } from "./backGroundAudio.js";

// taking the UserName & removing the splash screen (onclick())
const startClick = document.querySelector(".control-buttons span");
// const flashScreen = document.querySelector(".control-buttons");

let savedName = localStorage.getItem("user name");
if (savedName === null) {
  savedName = "";
}
export const onClickFunction = (startClick.onclick = function () {
  const getScore = localStorage.getItem("score");
  const flashScreen = document.querySelector(".control-buttons");
  const yourName = prompt("What's your name?");
  const scoreElement = document.querySelector(".score");
  if (getScore && savedName === yourName) {
    scoreElement.innerHTML = getScore;
  }
  //It may help me with the local storage
  // arrayOfUsers = arrayOfUsers.push(yourName);
  // console.log(arrayOfUsers);
  localStorage.setItem("name", yourName);
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Player";
    // if the user name ist null then will not be stored
    window.localStorage.removeItem("user name", yourName);
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  flashScreen.remove();
  // to play the bg sound
  backGroundAudio.play();
  //setting a timer
  const myTimer = document.querySelector(".timer span");
  let levelOneDuration = 120;
  displayTime(levelOneDuration);
  const countDown = setInterval(() => {
    levelOneDuration--;
    displayTime(levelOneDuration);
    if (levelOneDuration <= 0 || levelOneDuration < 1) {
      // wenn die zeit vorbei ist
      endTime(); // call this func
      clearInterval(countDown); // clear the interval
    }
  }, 1000);

  function displayTime(seconds) {
    // it's a math thing to calculate the minutes and sec
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    myTimer.innerHTML = `${min < 10 ? "0" : ""}${min}:${
      sec < 10 ? "0" : ""
    }${sec}`;
  }
  function endTime() {
    document.querySelector(".timer span").innerHTML = "Time Out";
    backGroundAudio.pause();
    // backGroundAudio.currentTime = 0;
    blocksContainer.classList.add("no-clicking");
    document.getElementById("end-sound").play();

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
});
