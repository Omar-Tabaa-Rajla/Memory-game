// background audio and call it when onclick event
// this function will play a background audio
//I could've done it in an easier way by just adding an onclick attribute to the (start game)
// then creating a function that loads the .mp3 and play() it
//However with that easier way i'll not be able to repeat the sound after it ends

export const backGroundAudio = new Audio("../audio/piano-moment.mp3");
if (typeof backGroundAudio.loop == "boolean") {
  backGroundAudio.loop = true;
} else {
  backGroundAudio.addEventListener(
    "ended",
    function () {
      this.currentTime = 0;
      this.play();
    },
    false
  );
}
