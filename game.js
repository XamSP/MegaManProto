let allRounds = firstSetOfRounds
var currentRound = allRounds[0];
var currentMegaMan;
var currentTargetIcon;

document.addEventListener("DOMContentLoaded", function() {
  mainTheme.play();
});

//Canvas Layers
var theCanvas = document.getElementById("theCanvas");
var ctx = theCanvas.getContext("2d");

var twoCanvas = document.getElementById("twoCanvas");
var ctx2 = twoCanvas.getContext("2d");

var threeCanvas = document.getElementById("threeCanvas");
var ctx3= threeCanvas.getContext("2d");

var fourCanvas = document.getElementById("fourCanvas");
var ctx4= fourCanvas.getContext("2d");

// GAME SETUP & CONTROLS

//Start-up
function startGame(){
  var menu = document.getElementById("mainMenu");
  var game = document.getElementById("bg"); 
 
  menu.style.display = "none";
  game.style.display = "block";

  console.log('worked?');
  mainTheme.stop();
  battleStart.play();

  setTimeout(()=>{draw(currentRound);},1000);
}
//Start-up END

//for the function dmgDished(round)
function spliceFromRound(round, enemy){
  if (enemy.hp <= 0){
    // ctx3.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
    //console.log("");
    currentTargetIcon.move(999);
    enemy.enemyAttackTimeOut(enemy); //for now, since both conditions were met on both functions, it gives the desired result; 

    //????
    if(enemy.name === "Pharaohman"){
      pharaohManHovering(enemy);
    }
    
    round.splice(i, 1);
    enemyDeleted.play();
    roundVictory(round)
    
  } else {
    //nothing
  }
}

function roundVictory(round) {
  if(currentRound.length <= 0){
    nextRound(allRounds, round)
  }
}

function nextRound(setOfRounds, round) {
  console.log(`Before: setOfRounds = ${setOfRounds}`)
  const index = setOfRounds.indexOf(round);
  console.log(`The index of this round should be 0 and it equals TO = ${index}`)
  setOfRounds.splice(index, 1);
  console.log(`After: setOfRounds = ${setOfRounds}`)
  currentRound = setOfRounds[0];
  startGame();
}

function dmgDished(round, dmg){
  
  for (i=0; i < round.length; i++) {
    
    if (round[i].targeted === true) {
      //random dmg since I haven't implemented the buster
      round[i].hp -= dmg;
      enemyHpDisplay(round[i]);
      dmgDishedSound.play();
      if (round[i].hp <= 0) {
        spliceFromRound(round, round[i]);
      }
    } else {
      continue;
    }
  }
}



function startEnemyHpDisplay(round) {
  round.map(enemy => enemyHpDisplay(enemy));
}

//Targeting and Placement

function placeArmy(round) {
  if(round.length === 3) {
    round[0].x = 740;
    round[0].y = 280;
    
    round[1].x = 680;
    round[1].y = 320;
    
    round[2].x = 740;
    round[2].y = 340;
  } else if (round.length === 2) {
    round[0].x = 720;
    round[0].y = 280;
    
    round[1].x = 720;
    round[1].y = 340;

  } else if (round.length === 1) {
    round[0].x = 720;
    round[0].y = 300;
  }
}

function autoTarget(round){
  var army = round;
  targetSound.play();
  return army[0].targeted = true;
}

function targetDown(round){
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
    //nothing lol
    //TESTING
    //TESTING
    } else if (army[army.length - 1].targeted === true && army[army.length - 1].status() === true) {
      army[army.length - 1].targeted = false;
      army[0].targeted = true;
      targetSound.play();
      break;
    
    } else if (army[i].targeted === true && army[i].status() === true) {
      army[i].targeted = false;
      army[i+1].targeted = true;
      targetSound.play();
      break;
  }
  }
}

function targetUp(round){ //
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol
    
    //if status is false (dead), remove from the round army and target next to them
    // }else if (army[0].targeted === true && army[0].status() === false){
    //   round.splice(i, 1);
    //   army[army.length -1].targeted = true;
    //   break;
    
    // } else if (army[i].targeted === true && army[i].status() === false) {
    //   round.splice(i, 1);
    //   army[i-1].targeted = true;
    //   break;
    
    } else if (army[0].targeted === true && army[0].status() === true) {
      console.log("status = " + army[0].status());
      army[0].targeted = false;
      army[army.length -1].targeted = true;
      targetSound.play();
      break;
    
    } else if (army[i].targeted === true && army[i].status() === true) {
    army[i].targeted = false;
    army[i-1].targeted = true;
    targetSound.play();
    break;
   }
  }
}

function autoTargetDown(round){
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
  
  if(army[army.length - 1].targeted === true){
    army[army.length - 1].targeted = false;
    army[0].targeted = true;
    break;
  

  }else if (army[i].targeted === true){
    army[i].targeted = false;
    army[i+1].targeted = true;
    break; 
  }
 }
}

function targetforDrawing(round){ 
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol
    } else if (army[i].targeted === true) {
      return army[i];
    } 
  }
}

//Keys for controls for player
document.onkeyup = function(e){
  var key = e.keyCode;
  // console.log("whereToGo: ", whereToGo);
 
  action(key);
  currentTargetIcon.move(key);
};

var TargetIcon = function(round) {
  this.x = round[0].x;
  this.y = round[0].y;
  this.width = round[0].width;
  this.height = round[0].height;
  this.img = "images/battlefield-misc/targetIcon.png";
};

TargetIcon.prototype.drawTargetIcon = function() {
  var targetImage = new Image();
  targetImage.src = this.img;
  var that = this;
  targetImage.onload = ()=>ctx3.drawImage(targetImage, that.x, that.y, that.width, that.height);

};

TargetIcon.prototype.move = function(number) {
  var that = this;
  switch(number){
  case 38: //the key ' ^ '
  targetUp(currentRound);
  drawTargetStuff(currentRound, that);
  
    break;
  //Testing to see if I can ignore the erasing and drawing if the army.length = 1
  case 40: //the key ' \/ '
  targetDown(currentRound);
  drawTargetStuff(currentRound, that);

    break;
  case 999:
  autoTargetDown(currentRound);
  drawTargetStuff(currentRound, that);
  //spliceFromRound(currentRound, that);
    break;  
  default:
   
  }
  //this.drawTargetIcon();
};

function drawTargetStuff(round, that){
  var army = round;
  if (army.length === 1){
    //nothing
  } else {
    ctx3.clearRect(that.x, that.y, that.width, that.height);
    currentTargetIcon.x = targetforDrawing(currentRound).x;
    currentTargetIcon.y = targetforDrawing(currentRound).y;
    currentTargetIcon.drawTargetIcon(); 
  }
}


function action(key) {
  //switch //the "WASD and space button"
  switch(key) {
    case 87: //the key 'W'
    if(!currentMegaMan.atkCooldown && currentMegaMan.guard === false){
      currentMegaMan.atkCooldown = true;
      currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster1.png');
      setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster2.png');},50);
      setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster3.png');},100);
      setTimeout(()=>{currentMegaMan.drawMegaMan(); currentMegaMan.atkCooldown=false;},150);
      dmgDished(currentRound, 3);
      busterShot.play();
    }
    else{}
      //nothing
      break;
    case 65: //the key 'A'
    guarding();
    
      break;
    case 83: //the key 'S'
    function sword(){
    if (currentMegaMan.guard_cooldown >= 30 && currentMegaMan.guard === false){
        currentMegaMan.guard_cooldown -= 30;
        currentMegaMan.guard = true;
        swordAnimation();
        console.log("sword reached");
      }
    }
    sword();

      break;
    //case 68: //the key 'D'
    //if(fourthCard.cooldown /*>=30%*/){
      //fourthCard.cardActivate();
    }
     // break;
    /*case 38: //the key ' ^ '
    targetUp();
        
      break;
    case 40: //the key ' \/ '
    targetDown();

      break;*/
   // case 32:
    //draw(round1);
    
      //default:
    
  
}

// CHARACTERS & ENEMIES

var Megaman = function(){
  this.name = 'MegaMan.EXE';
  this.hp = 100;
  this.gauge = 100;//% //later
  this.guard_cooldown = 100;//% //later
  this.atkCooldown = false;
  this.team = "player";
  this.x = 140;
  this.y = 320;
  this.width = 100;
  this.height = 60;
  this.img = "images/megaman/still/still1.png"; //change later :P
  this.guard = false;
  this.status = function() {if (this.hp > 0) {return true;} else {return false;}
  };
};

//Guard

function guarding() {
  var guardImg = new Image();
  guardImg.src = "images/megaman/guard/guardx.png";
  //var limitOne = 0;

  if (currentMegaMan.guard_cooldown >= 25 && currentMegaMan.guard === false) {
    console.log('guarding');
    currentMegaMan.guard = true;
    currentMegaMan.guard_cooldown -= 25;
    guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
    console.log('guard = ' + currentMegaMan.guard);
    shieldDrawedSound.play();
    setTimeout(()=>{if(currentMegaMan.guard === true){notGuarding();}else{}},400);
    
    //console.log("true variable = " + limitOne);

  } else {}
}

function guardingS() {
  //var guardImg = new Image();
  //guardImg.src = "images/megaman/guard/guardx.png";
  //var limitOne = 0;

  //if (currentMegaMan.guard_cooldown >= 25 && currentMegaMan.guard === false) {
    //console.log('guarding');
    currentMegaMan.guard = true;
    //currentMegaMan.guard_cooldown -= 25;
    //guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
    //console.log('guard = ' + currentMegaMan.guard);
    //shieldDrawedSound.play();
    //setTimeout(()=>{if(currentMegaMan.guard === true){notGuarding();}else{}},400);
    
    //console.log("true variable = " + limitOne);

  //} else {}
}

function notGuarding(){
  if (currentMegaMan.guard === true) {
    currentMegaMan.guard = false;
    shieldDrawedSound.stop();
    //currentMegaMan.guard_cooldown +=10;
    console.log(currentMegaMan.guard_cooldown + "not guarding");
    ctx2.clearRect(currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
    console.log('guard = ' + currentMegaMan.guard);
    //limitOne+=1; console.log("variable = " + limitOne);
  }
}

function guardGauge(megaman){
  var guardInterval = setInterval(() => guardRegen(megaman), 60);
  clearInterval();
  function guardRegen(megaman){
    //console.log('guard regen called!');
    if(megaman.guard_cooldown >= 100){
      //console.log('Its full')
      updateGuardCooldown();
    } else {
      megaman.guard_cooldown += 1;
      updateGuardCooldown();
      
      //console.log('its regenarating! gauge = ' + megaman.guard_cooldown);
    
    }

  }
}

// CARD MECHANICS
function Card(dmg, name, rank, effect) {
  this.dmg = dmg;
  this.name = name;
  this.rank = rank;
  this.effect = effect;
}

var search = new Card(0, "Search", "standard", function(){});
var shootingStars = new Card(30, "Shooting Stars", "mega", function(){});

//var template = document.getElementbyId("x");
//template.innerText("yes");

function cardActivate(){}

function pickCards(){
  var deck = [];
  
  function limitOneMegaCards(){
    for(i = 0; i < deck.length; i++){
      var megaLimit = 0;
      if (megaLimit === 2) {
        return deck[i] /*to the library*/;
      } else if (deck[i].rank === "mega"){
        megaLimit += 1;
      } else {continue;}
    }
  }
  function limitTwoSameCards(){
    for(i = 0; i < deck.length; i++){
      var multipleLimit = 0;
      if (multipleLimit = 3) {
        return deck[i]/*to the library*/; 
      } //else if (deck[i].name === deck[j].name){multipleLimit+=1}
  }
  
  if (deck === 10) {
    return "Ready";
  } else if (deck < 10) {
    return "Not ready";
  } else if (deck > 10) {
    //not finish coding
    return deck[10] + " 10 is the limit!"
  }
}
}













