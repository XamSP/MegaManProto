let allRounds;  //Each round of enemies
var gameStarted = false;  //To ensure game keys don't trigger if battle hasn't started
var currentRound; //Get first round
var currentMegaMan;
var fixedMegamanPosition; //Make sure enemies don't teleport if Megaman is not in his spot
var currentTargetIcon; //Which enemy you are targeting
var intervalObject = { //To cut off anything with a timeInterval like animations
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

//HTML Menu Elements 
let menuBGElement= document.getElementById("mainMenuBG");
let menuElement = document.getElementById("mainMenu");
let gameBoard = document.getElementById("bg"); 
let gameMenuElement = document.getElementById("gameMenu");
let chipFolderMenuElement = document.getElementById("chipFolderMenu");
let settingsMenuElement = document.getElementById("settingsMenu");
let gameOverElement = document.getElementById("gameover"); 
let creditsElement = document.getElementById("credits");
let volumeMasterElement = document.getElementById("volumeMaster");

gameMenuElement.style.display = "none"; //FIXME once I added the difficulties
chipFolderMenuElement.style.display = "none";
settingsMenuElement.style.display = "none";
gameOverElement.style.display = "none";

// GAME SETUP & CONTROLS

//Menus
function mainMenu() {
  blockAllElements();
  menuElement.style.display = "block";
}

function startGame(){
  menuBGElement.style.display = "none";
  menuElement.style.display = "none";
  gameMenuElement.style.display = "none"; //FIXME once I added the difficulties
  chipFolderMenuElement.style.display = "none";
  settingsMenuElement.style.display = "none";
  gameOverElement.style.display = "none"; //FIXME once it works
  gameBoard.style.display = "block";

  mainTheme.stop();
  battleStart.play();

  battleStartAnimation();
  setTimeout(()=>{draw(currentRound);},1000);
}

function difficultyMenu(){ 
  blockAllElements();
  gameMenuElement.style.display = "block";
}

function startRounds(difficulty) {
  switch (difficulty) {
    case 0:
      allRounds = easySetOfRounds.slice(0);
      currentRound = allRounds[0];
      startGame();
      break;
    
    case 1:
      allRounds = standardSetOfRounds.slice(0);
      currentRound = allRounds[0];
      startGame();
      break;

    case 2:
      startGame();
      break;

    case 3:
      allRounds = testSetOfRounds.splice(0);
      currentRound = allRounds[0];
      startGame();
      break;

    case 4:
      allRounds = testBossRound.splice(0);
      currentRound = allRounds[0];
      startGame();
      break;

    default:
      break;
  }
}

function x() {/* Place Holder */}

function folderMenu() {}

function settingsMenu() {
  blockAllElements();
  settingsMenuElement.style.display = "block";
}

function volumeMaster() {
  blockAllElements();
  menuBGElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url('images/background/menu.png')";
  volumeMasterElement.style.display = "block";
}

function credits(){
  blockAllElements();
  menuBGElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url('images/background/menu.png')";
  creditsElement.style.display = "block";
}

function backPage(int) {
  switch (int) {
    case 0:
      mainMenu();
      break;

    case 1:

      break;

    case 2:
      menuBGElement.style.backgroundImage = "url('images/background/menu.png')";

    case 3:
      settingsMenu();
      break;

    default:
      break;
  }
}

function gameOverMenu() {}

function backToMenu() {}

function blockAllElements(blockBGImage = false) {
  if (blockBGImage) {
    menuBGElement.style.display = "none";
  }

  menuElement.style.display = "none";
  gameMenuElement.style.display = "none"; 
  chipFolderMenuElement.style.display = "none"
  gameOverElement.style.display = "none"; 
  gameBoard.style.display = "none";
  settingsMenuElement.style.display = "none";
  creditsElement.style.display = "none";
  volumeMasterElement.style.display = "none";

}

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
    gameStarted = false;
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
  
  if (setOfRounds.length > 0) { currentRound = setOfRounds[0]; }
  //backToMenu();
  backgroundMusic(setOfRounds, index)
  startGame();
}

function refresh(){
  document.location.reload();
}