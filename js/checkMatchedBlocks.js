import { backGroundAudio } from "./backGroundAudio.js";
import * as onClickFunction from "./onClickFunction.js";
// import { showHighScore } from "./showHighScore.js";
let blocksContainer = document.querySelector(".memory-game-blocks");
// let arrayOfScores = [];
// checking the matched blocks
const highScoreElement = document.querySelector(".high-score");
var winner;
var myWinner;
export function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  const scoreElement = document.querySelector(".score");

  // I'll select the the the flipped cards according to their data custom (eg. data-animal="cat")
  if (firstBlock.dataset.animal == secondBlock.dataset.animal) {
    // if they are matched then remove the (is flipped) class and put instead (hat-match)
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
    // if the player has no name => won't be stored
    if (document.querySelector(".name span").innerHTML === "Player") {
      localStorage.removeItem("score", triesElement.innerHTML);
    } else {
      localStorage.setItem("score", triesElement.innerHTML);
      //------------------------------LOCAL STORAGE----------------------------------
      let name = localStorage.getItem("name");
      const score = localStorage.getItem("score");
      let userDataItems =
        JSON.parse(localStorage.getItem("userDataItems")) || [];
      let userDataItem = userDataItems.find((m) => m.name === name);
      if (userDataItem !== undefined) {
        userDataItems.find((m) => m.name === name).score = score;
      } else {
        userDataItems.push({
          score,
          name,
        });
      }
      // sorting the scores
      userDataItems.sort((a, b) => a.score - b.score);
      // just top 5
      userDataItems.splice(5);
      // save the result in the localStorage ... YES BABY!
      localStorage.setItem("userDataItems", JSON.stringify(userDataItems));

      console.log("userDataItems", userDataItems);

      winner = userDataItems.filter((m, i) => {
        if (i === 0) {
          return ` ${m.name} - ${m.score} `;
        }
      });
      // to get the keys out of the object
      for (let i of winner) {
        myWinner = `${i.name} with ${i.score} wrong tries.`;
      }

      console.log(myWinner, "😛");
    }
    //--------------------------END OF LOCAL STORAGE----------------------------------

    // if the two cards aren't the same, then remove the (is-flipped) to make them turn back and the failure sound
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
    highScoreElement.style.opacity = "0.8";
    highScoreElement.style.display = "block";
    function showWinner() {
      highScoreElement.innerHTML = `<p> The winner is ${myWinner}. </p> <br />
    <p> You've finished the game with ${triesElement.innerHTML} wrong tries. </p> <br />
    <p> try to be better! LOSER 😛 </p>`;
    }
    showWinner();
    blocksContainer.style.opacity = "0.2";
    // findingHeighScore(triesStorage);
    document.querySelector("#success").pause();
    setTimeout(() => {
      document.querySelector("#applause-sound").play();
    }, 1500);

    setTimeout(() => {
      window.location.reload();
    }, 10000);
  }
}
