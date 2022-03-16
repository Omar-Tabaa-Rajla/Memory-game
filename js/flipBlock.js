export function flipBlock(selectedBlock) {
  const blocks = Array.from(blocksContainer.children);
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
