import { backGroundAudio } from "./backGroundAudio.js";
import * as onClickFunction from "./onClickFunction.js";
// import { saveHeighScore } from "./saveToLocalStorage.js";
// let arrayOfScores = [];
// checking the matched blocks

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
    // let triesStorage = window.localStorage.setItem(
    //   "score",
    //   triesElement.innerHTML
    // );
    /*
    
    trying localStorage block
    
    */
    // const heighScores = JSON.parse(localStorage.getItem("heighScores")) || [];
    // let heighScores = [];
    // const getUser = localStorage.getItem("user name");
    let savedName = localStorage.getItem("user name");
    const scoreSaved = localStorage.getItem("score");
    // let mostRecentScore = JSON.parse(localStorage.getItem("highScores")) || [
    //   {},
    // ];
    // const mostRecentScore = localStorage.getItem("mostRecentScore");
    let heighScores = JSON.parse(localStorage.getItem("heighScores")) || [{}];
    // console.log("heighScores", heighScores);
    // console.log("mostRecentScore", mostRecentScore);
    // triesElement.innerHTML = scoreSaved;
    // console.log("scoreSaved", scoreSaved);
    // mostRecentScore = JSON.parse(scoreElement.innerHTML);

    // mostRecentScore = localStorage.getItem("highScores") || []
    // if (
    //   mostRecentScore.length === 0 ||
    //   mostRecentScore[mostRecentScore.length - 1].name !== savedName
    // ) {

    const saveHeighScore = () => {
      // if (
      //   heighScores.length === 0 ||
      //   heighScores[heighScores.length - 1].name !== savedName
      // ) {
      const score = {
        score: triesElement.innerHTML,
        name: savedName,
      };
      heighScores.push(score);
      localStorage.setItem("highScores", JSON.stringify(heighScores));
      // } else {
      //   heighScores[heighScores.length - 1].score = scoreSaved;
      // }
      console.log(heighScores);
    };
    saveHeighScore();

    // const score = {
    //   score: triesElement.innerHTML,
    //   name: savedName,
    // };
    // if (
    //   mostRecentScore.length === 0 ||
    //   mostRecentScore[mostRecentScore.length - 1].name !== savedName
    // ) {
    //   mostRecentScore.push(score);

    //   // console.log(mostRecentScore);
    //   localStorage.setItem("highScores", JSON.stringify(mostRecentScore));
    // } else {
    //   mostRecentScore[mostRecentScore.length - 1].score = scoreSaved;
    // }
    // console.log(mostRecentScore);

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
