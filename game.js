let allRounds = firstSetOfRounds;
var currentRound = allRounds[0];
var currentMegaMan;
var fixedMegamanPosition;
var currentTargetIcon; //Which enemy you are targeting
var intervalObject = {
  intervals: new Set(),

  clear(id) {
    this.intervals.delete(id);
    return clearInterval(id);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  mainTheme.play();
});

//Canvas Layers
var theCanvas = document.getElementById("theCanvas");
var ctx = theCanvas.getContext("2d");

var twoCanvas = document.getElementById("twoCanvas");
var ctx2 = twoCanvas.getContext("2d");

var threeCanvas = document.getElementById("threeCanvas");
var ctx3 = threeCanvas.getContext("2d");

var fourCanvas = document.getElementById("fourCanvas");
var ctx4 = fourCanvas.getContext("2d");

var fiveCanvas = document.getElementById("fiveCanvas");
var ctx5 = fourCanvas.getContext("2d");

// GAME SETUP & CONTROLS

//Start-up
function startGame(){
  var menu = document.getElementById("mainMenu");
  var game = document.getElementById("bg"); 
 
  menu.style.display = "none";
  game.style.display = "block";

  mainTheme.stop();
  battleStart.play();

  console.log(currentRound);
  battleStartAnimation();
  setTimeout(()=>{draw(currentRound);},1000);
}
//Start-up END

//for the function dmgDished(round)
function spliceFromRound(round, enemy){
    currentTargetIcon.move(999);
    
    enemy.enemyAttackTimeOut(enemy); //for now, since both conditions were met on both functions, it gives the desired result; 

    //this ensures to stop the still animation 
    console.log("Enemy deleted: " + enemy.name);
    enemy.animation();

    round.splice(i, 1);
    enemyDeleted.play();
    roundVictory(round)
}

function roundVictory(round) {
  if(currentRound.length <= 0){
    winAnimation();
    virusBustingBGM.stop()
    winJingle.play();
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);

    //initializing next round
    setTimeout(()=>{nextRound(allRounds, round)}, 2000);
  }
}

function nextRound(setOfRounds, round) {
  const index = setOfRounds.indexOf(round);
  setOfRounds.splice(index, 1);

  //drawing
  ctx3.clearRect(currentTargetIcon.x , currentTargetIcon.y, currentTargetIcon.width, currentTargetIcon.height);
  
  currentRound = setOfRounds[0];
  backgroundMusic(setOfRounds, index)
  startGame();
}

function refresh(){
  document.location.reload();
}