var currentGame;
var currentMegaMan;
var currentTargetIcon;

var theCanvas = document.getElementById("theCanvas");
var ctx = theCanvas.getContext("2d");

var twoCanvas = document.getElementById("twoCanvas");
var ctx2 = twoCanvas.getContext("2d");

var threeCanvas = document.getElementById("threeCanvas");
var ctx3= threeCanvas.getContext("2d")

// GAME SETUP & CONTROLS
/*var Game = function(){
  this.car = {}; // car => OBJECT 
  this.enemies = []; // obstacles => ARRAY
}*/

function startGame(){
  getArmy();
  autoTarget();
}

function startRound(){
  startGame(); //might change later, to call the first two functions'getArmy and autoTarget'.
  currentHP();
}

function draw(round) {
  placeArmy(round);
  round.map(x => x.drawEnemy());
  // currentMegaMan = new Megaman();  
  currentMegaMan = new Megaman().drawMegaMan();
  currentMegaMan = new Megaman(); 
  //autoTarget(round);
  autoTarget(round);
  currentTargetIcon = new TargetIcon(round).drawTargetIcon();
  // placeTargetIcon(round);
  updateHp();
}

function updateHp() {
 // $("#hp-bar").text(currentMegaMan.hp); just gonna canvas
 if(currentMegaMan.hp >= 1) {
  ctx2.clearRect(0 ,0 ,80, 80);
  ctx2.font = "30px Arial";
  ctx2.fillStyle = 'white';
  ctx2.fillText(currentMegaMan.hp, 30, 30);
} else if (currentMegaMan.hp < 10) {
  ctx2.clearRect(0,0,80,80);
}

}

function cardActivate(){}

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
    round[0].y = 320;
  }
}

/*function getArmy(round){ //need improvement
  //get all enemies in the battlefield in the same round
  var army = [enemy];
  return army;
}*/

function autoTarget(round){
  var army = round;
  return army[0].targeted = true;
}


//place targetIcon function

function targetDown(round){
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol
    } else if (army[army.length - 1].targeted === true) {
      army[army.length - 1].targeted = false;
      army[0].targeted = true;
      break;
    
    } else if (army[i].targeted === true) {
      army[i].targeted = false;
      army[i+1].targeted = true;
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
    } else if (army[0].targeted === true) {
      army[0].targeted = false;
      army[army.length -1].targeted = true;
      break;
    
    } else if (army[i].targeted === true) {
    army[i].targeted = false;
    army[i-1].targeted = true;
    break;
   }
  }
}


function action(key) {
  //switch //the "WASD and space button"
  switch(key) {
    case 87: //the key 'W'
    if(firstCard.cooldown /*>= 30%*/) {
      firstCard.cardActivate();
    }
      break;
    case 65: //the key 'A'
    if(secondCard.cooldown /*>= 30%*/){
      secondCard.cardActivate();
    }
      break;
    case 83: //the key 'S'
    if(thirdCard.cooldown /*>=30%*/){
       thirdCard.cardActivate();
     } 
      break;
    case 68: //the key 'D'
    if(fourthCard.cooldown /*>=30%*/){
      fourthCard.cardActivate();
    }
      break;
    case 38: //the key ' ^ '
    targetUp();
        
      break;
    case 40: //the key ' \/ '
    targetDown();

      break;
    default:
    console.log("lol");  
  }
}

function dmgReceived(enemy) {
  currentMegaMan.hp -= enemy.dmg_output;
  updateHp();
}

function dmgDished(round){
  for (i=0; i < round.length; i++) {
    if (round[i].targeted === true) {
      //random dmg since I haven't implemented the buster
      round[i].hp -= 10;
      enemyHpDisplay(round[i]);

    } else {
      continue;
    }
  }
}

function enemyHpDisplay(enemy){
  if(enemy.hp >= 1) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height);
  } else if (enemy.hp < 10) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -10, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
  }
}
// CHARACTERS & ENEMIES

var Megaman = function(){
  this.name = 'MegaMan.EXE';
  this.hp = 100;
  this.gauge = 100;//% //later
  this.guard_cooldown = 100;//% //later
  this.team = "player";
  this.x = 140;
  this.y = 320;
  this.width = 80;
  this.height = 60;
  this.img = "/home/max/test/Max's Game/images/megaman/megaBuster/megaBuster(loop).gif"; //change later :P
};

Megaman.prototype.drawMegaMan = function() {
  var megaManImage = new Image();
  megaManImage.src = this.img;
  var that = this;
  megaManImage.onload = ()=>ctx.drawImage(megaManImage, that.x, that.y, that.width, that.height);
  

};

var Enemy = function (name, hp, dmg_output, guard, attack_interval,img) {
  this.name = name;
  this.hp = hp;
  this.dmg_output = dmg_output;
  this.guard = false;
  this.team = 'opponent';
  this.attack_interval = attack_interval;
  this.targeted = false;
  this.x = 0;
  this.y = 0;
  this.width = 60;
  this.height = 60;
  this.img = img;

}

Enemy.prototype.drawEnemy = function(){
  var enemyImage = new Image();
  enemyImage.src = this.img;
  var that = this;
  enemyImage.onload = ()=>ctx.drawImage(enemyImage, that.x, that.y, that.width, that.height);
  //check the placeArmy() to place on the battlefield;

};

var mettaur = new Enemy("Mettaur",40,20,false,20,"/home/max/test/Max's Game/images/enemies/mettaur/mettaur_atk.png");

var mettaur2 = new Enemy("Mettaur",40,20,false,20,"/home/max/test/Max's Game/images/enemies/mettaur/mettaur_atk.png");

var mettaur3 = new Enemy("Mettaur",40,20,false,20,"/home/max/test/Max's Game/images/enemies/mettaur/mettaur_atk.png");

var round1 = [mettaur, mettaur2, mettaur3];

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

TargetIcon.prototype.move = function() {
  ctx3.clearRect(this.x, this.y, this.width, this.height);
  switch(number){
  case 38: //the key ' ^ '
  targetUp();
      
    break;
  case 40: //the key ' \/ '
  targetDown();

    break;
  default:
  console.log("lol");  
  }
  this.drawTargetIcon();
};

/*function placeTargetIcon(round) {
  var army = round;
  
  for (i=0; i < round.length; i++) {
    if (round[i].targeted === true) {
      currentTargetIcon.x = round[i].x;
      currentTargetIcon.y = round[i].y;

  } else {
    continue;
  }
  
 }
}*/



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













