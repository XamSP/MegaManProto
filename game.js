var currentRound = round1;
var currentMegaMan;
var currentTargetIcon;


//Canvas Layers
var theCanvas = document.getElementById("theCanvas");
var ctx = theCanvas.getContext("2d");

var twoCanvas = document.getElementById("twoCanvas");
var ctx2 = twoCanvas.getContext("2d");

var threeCanvas = document.getElementById("threeCanvas");
var ctx3= threeCanvas.getContext("2d")

// GAME SETUP & CONTROLS

//Start-up
function startGame(){
  var menu = document.getElementById("mainMenu");
  var game = document.getElementById("bg"); 
 
  menu.style.display = "none";
  game.style.display = "block";

  console.log('worked?');
  draw(round1);

}

function startRound(){
  startGame(); //might change later, to call the first two functions'getArmy and autoTarget'.
  currentHP();
}

function draw(round) {
  placeArmy(round);
  round.map(x => x.drawEnemy(x.img));
  round.map(x => x.enemyAttackInterval());
  currentRound = round;
  // currentMegaMan = new Megaman();  
  currentMegaMan = new Megaman();
  currentMegaMan.drawMegaMan(); 
  //autoTarget(round);
  autoTarget(round);
  currentTargetIcon = new TargetIcon(round).drawTargetIcon();
  currentTargetIcon = new TargetIcon(round);
  // placeTargetIcon(round);
  updateHp();
  startEnemyHpDisplay(round);
  guardGauge(currentMegaMan);
}

//Hp, Gauges, and dmgs. 

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

function updateGuardCooldown(){
  ctx2.clearRect(0 ,40 ,110, 80);
  ctx2.font = "30px Arial"; 
  ctx2.fillStyle = 'white';
  ctx2.fillText(currentMegaMan.guard_cooldown+"%", 30, 70);
  //ctx2.fillText("%",80, 90)
}

function dmgReceived(enemy) {
  if(currentMegaMan.guard === true){
    
  } else if (currentMegaMan.guard === false && enemy.hp >0){
    console.log(enemy);
    currentMegaMan.hp -= enemy.dmg_output;
    updateHp();
  } else {

  }

  console.log('Enemy atk impact!');
}


//for the function dmgDished(round)
function spliceFromRound(round, enemy){
  if (enemy.hp <= 0){
    // ctx3.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
    //console.log("");
    currentTargetIcon.move(999);
    enemy.enemyAttackTimeOut(enemy) //for now, since both conditions were met on both functions, it gives the desired result; 
    round.splice(i, 1);
    
    
  } else {
    //nothing
  }
}

function dmgDished(round){
  
  for (i=0; i < round.length; i++) {
    
    if (round[i].targeted === true) {
      //random dmg since I haven't implemented the buster
      round[i].hp -= 1;
      enemyHpDisplay(round[i]);
      spliceFromRound(round, round[i], i);
      
    } else {
      continue;
    }
  }
}

function enemyHpDisplay(enemy){
  if(enemy.hp >= 1) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -20, enemy.width, enemy.height);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  } else if (enemy.hp < 1) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -10, enemy.y + enemy.height + (enemy.height / 8) -20, enemy.width, enemy.height);
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
    round[0].y = 320;
  }
}

function autoTarget(round){
  var army = round;
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
      break;
    
    } else if (army[i].targeted === true && army[i].status() === true) {
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
      break;
    
    } else if (army[i].targeted === true && army[i].status() === true) {
    army[i].targeted = false;
    army[i-1].targeted = true;
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
  spliceFromRound(currentRound, that);
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
    currentTargetIcon.x = targetforDrawing(round1).x;
    currentTargetIcon.y = targetforDrawing(round1).y;
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
      dmgDished(currentRound);
    }
    else{}
      //nothing
      break;
    case 65: //the key 'A'
    guarding();
    
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
    /*case 38: //the key ' ^ '
    targetUp();
        
      break;
    case 40: //the key ' \/ '
    targetDown();

      break;*/
    case 32:
    draw(round1);
    
      default:
    
  }
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


Megaman.prototype.drawMegaMan = function(img) {
  ctx.clearRect(140,320,100,60);
  if(!img)
    img = this.img;
  var megaManImage = new Image();
  megaManImage.src = img;
  var that = this;
  megaManImage.onload = ()=>ctx.drawImage(megaManImage, that.x, that.y, that.width, that.height);
  

};

var Enemy = function (name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs) {
  this.name = name;
  this.hp = hp;
  this.dmg_output = dmg_output;
  this.guard = false;
  this.team = 'opponent';
  this.attack_interval = attack_interval;
  this.targeted = false;
  this.status = function() {if (this.hp > 0) {return true;} else {return false;}
  };
  this.x = 0;
  this.y = 0;
  this.width = 60;
  this.height = 60;
  this.img = img;
  this.intervalSecs = intervalSecs;
  this.timeOutSecs = timeOutSecs;
};



var pharaohMan = new Enemy("Pharaohman", 200, 0, false,0, "images/enemies/pharaohman/PharaohMan1.png",2500, 1000);

function pharaohManHovering(){
  var hover = setInterval(pharaohManFrames, 2000);
  
    function pharaohManFrames(){
      
    }
  
  }

  Enemy.prototype.drawEnemy = function(img){
  ctx.clearRect(this.x, this.y, this.width, this.height);
  var enemyImage = new Image();
  enemyImage.src = img;
  var that = this;
  enemyImage.onload = ()=>ctx.drawImage(enemyImage, that.x, that.y, that.width, that.height);
  //check the placeArmy() to place on the battlefield;

};

Enemy.prototype.enemyAttackInterval = function(){
  console.log('this inside enemyAttackIntervel ====', this);
  var that = this;
  if (this.hp > 1) {
    console.log(this.name);
    var everything = setInterval(()=>this.enemyAttackTimeOut(this, everything) ,this.intervalSecs + Math.floor(Math.random() * 3));
    
  
    
  } else {

  }
};



Enemy.prototype.enemyAttackTimeOut = function(context, interval){
  //console.log('this inside enemyAttackTimeOut ====', this, context);
  //done it passes this
  function getAnimation1(obj) {
    if (obj.name === "Mettaur"){
      mettaurAttackAnimation1(obj);

    } else if (obj.name === "Pharaohman"){
      pharaohManAttackAnimation1(obj);
    }
  }
  
  if(this.hp > 0){
  getAnimation1(this);
  this.drawEnemyAtkAnimation(this.name, this.x, this.y);
  setTimeout(dmgReceived, this.timeOutSecs, this);
  } else {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    clearInterval(interval);
    console.log("everything ded");
  }



};

function allEnemiesAtk(round){

}

var mettaur = new Enemy("Mettaur",40,20,false,20,"images/enemies/mettaur/mettaur.png", 5000, 2000);

var mettaur2 = new Enemy("Mettaur",40,20,false,20,"images/enemies/mettaur/mettaur.png", 7000, 2000);

var mettaur3 = new Enemy("Mettaur",40,20,false,20,"images/enemies/mettaur/mettaur.png", 9000, 2000);

var round1 = [mettaur, mettaur2, mettaur3];
var round2 = [pharaohMan];

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
    setTimeout(()=>{if(currentMegaMan.guard === true){notGuarding();}else{}},400);
    //console.log("true variable = " + limitOne);

  } else {}
}


function notGuarding(){
  if (currentMegaMan.guard === true) {
    currentMegaMan.guard = false;
    //currentMegaMan.guard_cooldown +=10;
    console.log(currentMegaMan.guard_cooldown + "not guarding");
    ctx2.clearRect(currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
    console.log('guard = ' + currentMegaMan.guard);
    //limitOne+=1; console.log("variable = " + limitOne);
}
}

function reDrawGuard(){
  var guardImg = new Image();
  guardImg.src = "images/megaman/guard/guardx.png";
  
  if (currentMegaMan.guard === true){
    guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
  }
} 


function guardGauge(megaman){
  var guardInterval = setInterval(() => guardRegen(megaman), 60);
  clearInterval();
  function guardRegen(megaman){
    //console.log('guard regen called!');
    if(megaman.guard_cooldown >= 100){
      //console.log('Its full')
      updateGuardCooldown()
    } else {
      megaman.guard_cooldown += 1;
      updateGuardCooldown();
      
      //console.log('its regenarating! gauge = ' + megaman.guard_cooldown);
    
    }

  }
}


//ANIMATIONS!!!!

function mettaurAttackAnimation1(mettaur){
  mettaur.drawEnemy('images/enemies/mettaur/mettaur1.png');
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur2.png');},100);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur3.png');},200);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur4.png');},300);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur5.png');},400);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur6.png');},500);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur7.png');},600);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur8.png');},700);
      setTimeout(()=>{mettaur.drawEnemy('images/enemies/mettaur/mettaur9.png');},800);
      setTimeout(()=>{mettaur.drawEnemy(mettaur.img);},900);
}

function EnemyAtkAnimation(obj){
  this.x = 720 +100;
  this.y = obj.y;
  this.meme = "old meme";//just to test
  this.width = 60;
  this.height = 60;
  this.img = "";
}

EnemyAtkAnimation.prototype.drawTheAtkAnimation = function(img, x){
  //PASSES THE MEME OF THE OBJ OF ATKANIMATION console.log('Does mettaurAttackAnimation2 take the obj ' + this.meme);
  ctx2.clearRect(this.x - x +125, this.y, this.width, this.height);
  reDrawEnemyHp(round1);
  var enemyAtkImage = new Image();
  enemyAtkImage.src = img;
  var that = this;
  enemyAtkImage.onload = ()=>ctx2.drawImage(enemyAtkImage, that.x - x, that.y, that.width, that.height);
  /*PASSES THE IMG*/ console.log("the img is "+img);
};

Enemy.prototype.drawEnemyAtkAnimation = function(name, x, y){
  var that = this;
  //DONE IT PASSES THIS! console.log("that name = " + this.name);
  function getAnimation(name, obj){
    if(name === "Mettaur"){
      //PASSES THE OBJ console.log("getAnimation was called for " + obj.name);
      mettaurAttackAnimation2(obj);
    }
  }
  getAnimation(this.name, this);
  /*
  ctx2.clearRect(this.x, this.y, this.width, this.height);
  var EnemyAtkAnimationImage = new Image();
  EnemyAtkAnimationImage.src = img;
  var that = this;
  EnemyAtkAnimationImage.onload = ()=>ctx2.drawImage(EnemyAtkAnimationImage, that.x, that.y, that.width, that.height);
  */
};

function mettaurAttackAnimation2(obj){
  var mettaurAttackFrame = new EnemyAtkAnimation(obj);
  //DONE IT PASSES THE OBJ console.log('Does mettaurAttackAnimation2 take the obj ' + obj.name);

  //var mettaurAttackFrame5 = new EnemyAtkAnimation('images/enemies/mettaur/mettaurAtk5.png');

  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk1.png", 145);},800);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk2.png", 270);},1075);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk3.png", 395);},1350);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk4.png", 520);},1625);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk5.png", 645);},1900);
  setTimeout(()=>{ctx2.clearRect(mettaurAttackFrame.x -645, mettaurAttackFrame.y, mettaurAttackFrame.width, mettaurAttackFrame.height)}, 2000);
  setTimeout(()=>{reDrawGuard();},2000);
  function clear(obj){
  //console.log(obj.meme);
  ctx2.clearRect(obj.x -500, obj.y, obj.width, obj.height);
  }

}

function reDrawEnemyHp(round) {
  var army = round;
  if(army.length === 3){
  enemyHpDisplay(army[0]);
  enemyHpDisplay(army[1]);
  enemyHpDisplay(army[2]);

  } else if (army.length === 2){
  enemyHpDisplay(army[0]);
  enemyHpDisplay(army[1]);

  } else {
    enemyHpDisplay(army[0]);
  }

}


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

//Frames
/*function megaBusterInterval() {
  var frame = 0;
  var framez = setInterval(megaBusterFrames() , 100);

  
  
  var firstFrame = new Image();
  firstFrame.src = "images/megaman/megaBuster/megaBuster1.png";
  var secondFrame = new Image();
  secondFrame.src = "images/megaman/megaBuster/megaBuster2.png";
  var thirdFrame = new Image();
  thirdFrame.src = "images/megaman/megaBuster/megaBuster3.png"; 
  
  
  ctx.clearRect(currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);
  if(frame === 3){
    console.log('4');
    ctx.drawImage(currentMegaMan.drawMegaMan());
    clearInterval(framez);
  
  } else if (frame === 2) {
    console.log('3');
    ctx.drawImage(thirdFrame, currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);
    return frame++;
  
  } else if (frame === 1) {
    console.log('2');
    ctx.drawImage(secondFrame, currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);
    frame++;
  
  } else {
    ctx.drawImage(firstFrame, currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);
    console.log('1');
    return frame+=1;
  }
  return frame++;

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













