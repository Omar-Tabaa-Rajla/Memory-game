import { backGroundAudio } from "./backGroundAudio.js";
import * as onClickFunction from "./onClickFunction.js";
// import { saveHeighScore } from "./saveToLocalStorage.js";
// let arrayOfScores = [];
// checking the matched blocks

export function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  const scoreElement = document.querySelector(".score");

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
    // let triesStorage = window.localStorage.setItem(
    //   "score",
    //   triesElement.innerHTML
    // );
    /*
    
    trying localStorage block
    
    */
    const heighScores = JSON.parse(localStorage.getItem("heighScores")) || [];
    let mostRecentScore = localStorage.getItem("mostRecentScore");
    // scoreElement.innerHTML = mostRecentScore;
    mostRecentScore = JSON.parse(scoreElement.innerHTML);
    const saveHeighScore = () => {
      const score = {
        score: mostRecentScore,
        name: onClickFunction.savedName,
      };
      heighScores.push(score);
      console.log(heighScores);
    };
    saveHeighScore();
    /**
    
    localStorage block


    */

    if (document.querySelector(".name span").innerHTML === "Player") {
      window.localStorage.removeItem("score", triesElement.innerHTML);
    } else {
      let triesStorage = window.localStorage.setItem(
        "score",
        triesElement.innerHTML
      );
      //   console.log("scores before", arrayOfScores);
      //   addingScore(triesElement.innerHTML);
      //   console.log("scores after", arrayOfScores);
    }
    //else {
    //   window.localStorage.removeItem("score", triesElement.innerHTML);
    //   // window.localStorage.clear();
    // }

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
    // findingHeighScore(triesStorage);
    document.querySelector("#success").pause();
    setTimeout(() => {
      document.querySelector("#applause-sound").play();
    }, 1500);
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }
}

// const addingScore = (param) => {
//   return arrayOfScores.push(param);
// };

// function findingHeighScore(par) {
//   const storedScore = localStorage.getItem("score");
//   const heighScores = JSON.parse(localStorage.getItem("heighScores")) || [];
//   const mostRecentScore = localStorage.getItem("mostRecentScore");
//   triesStorage.innerHTML = mostRecentScore;
//   const saveHeighScore = () => {
//     const score = {
//       score: mostRecentScore,
//       name: onClickFunction.yourName,
//     };
//     console.log(score);
//   };
// }
