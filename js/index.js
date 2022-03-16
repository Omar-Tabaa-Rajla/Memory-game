// taking the UserName & removing the splash screen (onclick())
document.querySelector(".control-buttons span").onclick = function () {
  const yourName = prompt("What's your name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Player";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  // to play the bg sound
  myAudio.play();
  //setting a timer
  const myTimer = document.querySelector(".timer span");
  let levelOneDuration = 5;
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
    // myAudio.stop();
    document.getElementById("end-sound").play();
    blocksContainer.classList.add("no-clicking");

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
// checking the matched blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = doecument.querySelector(".tries span");
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
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }
}
// background audio and call it when onclick event
// this function will play a background audio
//I could've done it in an easier way by just adding an onclick attribute to the (start game)
// then creating a function that loads the .mp3 and play() it
//However with that easier way i'll not be able to repeat the sound after it ends
myAudio = new Audio("../audio/piano-moment.mp3");
if (typeof myAudio.loop == "boolean") {
  myAudio.loop = true;
} else {
  myAudio.addEventListener(
    "ended",
    function () {
      this.currentTime = 0;
      this.play();
    },
    false
  );
}
