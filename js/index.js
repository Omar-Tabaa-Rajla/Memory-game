import { backGroundAudio } from "./backGroundAudio.js";
import { checkMatchedBlocks } from "./checkMatchedBlocks.js";
// taking the UserName & removing the splash screen (onclick())
const startClick = document.querySelector(".control-buttons span");
startClick.onclick = function () {
  const yourName = prompt("What's your name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Player";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
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
};
// setting a duration for every two cards, so I can't start flipping a new card until the first two go back to their previous situation.
const duration = 1000;

const blocksContainer = document.querySelector(".memory-game-blocks");
// array.from(foo) => ["f","o","o"]
// so in my situation i'll get every fucking block alone in an array called blocks["div1","div2",...]
// to be able to randomize (shuffle) them by calling every block with its own key number
const blocks = Array.from(blocksContainer.children);
// console.log(blocks);
//if I write Array(10) => [0,1..,10] => length = 10
// in my situation I'll get the length, then their keys and after that I shuffle em
// I can't access the keys without using the spread operator. WHY? cz I can't access em when they are (keys) in an array.
const orderRange = [...Array(blocks.length).keys()];
// OR I could've done it like that
// const orderRange= Array.from(Array(blocks.length).keys())
// console.log(orderRange);
// console.log(orderRange); BEFORE SHUFFLING
shuffleArray(orderRange);
// console.log(orderRange); AFTER SHUFFLING

// Now adding orders to the blocks (order is a css property of flex array)
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // adding the click event
  block.addEventListener("click", function () {
    // triggering the flip block function
    flipBlock(block);
  });
});

//THE FISHER-YATES ALGORITHM
//https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  // collecting the flipped cards (just two) and then compare em if they r equal or not.
  const allFlippedBlocks = blocks.filter((flippedBlock) => {
    return flippedBlock.classList.contains("is-flipped");
  });
  if (allFlippedBlocks.length === 2) {
    // function to stop clicking on the fucking divs when the if condition is true
    //using the pointer event, which allows/doesn't allow the html element to response to the clicking (touching) action
    // pointer-event =none => nothing will happen BUT this will be applied in css
    stopClicking();

    //calling the matching function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//stopClicking function
function stopClicking() {
  // adding class noClicking on the main container
  blocksContainer.classList.add("no-clicking");
  //setTimeout with the  given duration to allow the user to reclick the blocks, by removing the 'no-clicking' class
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
