var currentRound = round1;
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
var ctx3= threeCanvas.getContext("2d")

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

  setTimeout(()=>{draw(round1);},1000);

}

function startRound(){
  startGame(); //might change later, to call the first two functions'getArmy and autoTarget'.
  currentHP();
}

function draw(round) {
  placeArmy(round);
  round.map(x => x.drawEnemy(x.img));
  round.map(x => x.enemyAttackInterval());
  round.map(x => x.animation());
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
  backgroundMusic(round);
  megabar();


}

function megabar(){
  var bar = new Image();
  bar.src = "images/background/mmface.png";
  bar.onload = ()=>ctx.drawImage(bar,30,80,80,30);
}

// function gameEnd(){
//   var end = new Image();
//   end.src= "";
//   setTimeout(()=>{end.},0)
  
//   end.onload = ()=>images();

// }

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
  deleted.play();
  currentMegaMan = null;
  ctx.clearRect(140,320,100,60);


  setTimeout(()=>{document.location.reload()},1000);
  // var gameover = document.getElementById("gameover");
  // gameover.style.display = block;
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
    shielded.play();
  } else if (currentMegaMan.guard === false && enemy.hp >0){
    console.log(enemy);
    currentMegaMan.hp -= enemy.dmg_output;
    updateHp();
    hurt.play();
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
    enemy.enemyAttackTimeOut(enemy); //for now, since both conditions were met on both functions, it gives the desired result; 
    if(enemy.name === "Pharaohman"){
      pharaohManHovering(enemy);
    }
    
    round.splice(i, 1);
    enemyDeleted.play();

    
  } else {
    //nothing
  }
}

function dmgDished(round, dmg){
  
  for (i=0; i < round.length; i++) {
    
    if (round[i].targeted === true) {
      //random dmg since I haven't implemented the buster
      round[i].hp -= dmg;
      enemyHpDisplay(round[i]);
      dmgDishedSound.play();
      spliceFromRound(round, round[i], i);
      
    } else {
      continue;
    }
  }
}

function enemyHpDisplay(enemy){
  if(enemy.hp >= 1 && enemy.width === 60) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -20, enemy.width, enemy.height);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  
  } else if (enemy.hp >= 100){
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  
  }else if (enemy.hp >= 1 && enemy.hp <=99 && enemy.width === 60){
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  
  
  }else if (enemy.hp >= 1 && enemy.hp <=99){
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 3), enemy.y + enemy.height+10);
  
  }else if (enemy.hp < 1) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -10, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
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


Megaman.prototype.drawMegaMan = function(img) {
  ctx.clearRect(this.x,320,100,60);
  if(!img)
    img = this.img;
  var megaManImage = new Image();
  megaManImage.src = img;
  var that = this;
  megaManImage.onload = ()=>ctx.drawImage(megaManImage, that.x, that.y, that.width, that.height);
  

};

Megaman.prototype.drawMegaMan2 = function(img) {
  ctx2.clearRect(this.x,320,100,60);
  if(!img)
    img = this.img;
  var megaManImage = new Image();
  megaManImage.src = img;
  var that = this;
  megaManImage.onload = ()=>ctx2.drawImage(megaManImage, that.x, that.y, that.width, that.height);
  

};

var Enemy = function (name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y) {
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
  this.width = 60 + x;
  this.height = 60 + y;
  this.img = img;
  this.intervalSecs = intervalSecs;
  this.timeOutSecs = timeOutSecs;
};



var pharaohMan = new Enemy("Pharaohman", 200, 0, false,0, "images/enemies/pharaohman/PharaohMan1.png",2000, 1500, 40,40);

function pharaohManHovering(pharaohMan){
 
  //Need to clear interval with the right ID
  function getId(){var hover = setInterval(()=>{pharaohManFrames(pharaohMan);}, 1200); return hover;}

  getId();
  
  function pharaohManFrames(pharaohMan){
    pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan2.png');
    setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan3.png');},200);
    setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan4.png');},400);
    setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan3.png');},600);
    setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan2.png');},800);
    setTimeout(()=>{pharaohMan.drawEnemy(pharaohMan.img);},1000);
  };
  
  if(pharaohMan.hp < 1){
    clearInterval(getId());
    console.log("Pharaohman interval = " + getId());
  } 
    
    
}

function pharaohManLaser(obj) {
  var laser = new EnemyAtkAnimation(obj);

  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL.png", obj.x, 50);},100);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL0.png", obj.x,50);},200);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL4.png", obj.x,50);},300);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL5.png", obj.x,50);},400);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL6.png", obj.x,50);},500);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL7.png", obj.x,50);},600);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL8.png", obj.x,50);},700);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL9.png", obj.x,50);},800);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL10.png", obj.x,50);},900);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL11.png", obj.x,50);dmgDished(currentRound,40);},1000);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL12.png", obj.x,50);},1100);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL13.png", obj.x,50);},1200);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL14.png", obj.x,50);},1300);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL15.png", obj.x,50);},1400);
  setTimeout(()=>{laser.drawTheAtkAnimation("/home/max/test/Max's Game/images/enemies/pharaohman/Laser/PharaohmanL16.png", obj.x,50);},1500);
}

function pharaohManAttackAnimation1(obj){
  pharaohManLaser(obj);
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
  console.log('this inside enemyAttackInterval ====', this);
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

var mettaur = new Enemy("Mettaur",90,20,false,20,"images/enemies/mettaur/mettaur.png", 3000, 2000,0,0);

var mettaur2 = new Enemy("Mettaur",90,20,false,20,"images/enemies/mettaur/mettaur.png", 5000, 2000,0,0);

var mettaur3 = new Enemy("Mettaur",90,20,false,20,"images/enemies/mettaur/mettaur.png", 7000, 2000,0,0);

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
    shieldDrawedSound.play();
    setTimeout(()=>{if(currentMegaMan.guard === true){notGuarding();}else{}},400);
    
    //console.log("true variable = " + limitOne);

  } else {}
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

function swordAnimation() {
  ctx.clearRect(140,320,100,60);
  currentMegaMan.x = currentTargetIcon.x- 80;
  currentMegaMan.width += 20;
  currentMegaMan.height += 20;
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword1.png");},50);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword2.png");},100);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword3.png");},150);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword4.png"); dmgDished(currentRound, 20)},200);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword5.png");},250);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword6.png");},300);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword7.png");},350);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword8.png");},400);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword9.png");},450);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword10.png");},500);
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword11.png");},550);
  setTimeout(()=>{ctx2.clearRect(currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);currentMegaMan.x = 140;currentMegaMan.y=320;currentMegaMan.width=100;currentMegaMan.height=60;},575);
  setTimeout(()=>{round1.map(x=> enemyHpDisplay(x));currentMegaMan.drawMegaMan(); currentMegaMan.guard = false;},600);
}

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

Enemy.prototype.animation = function(){
  if (this.name === "Pharaohman") {
    pharaohManHovering(this);
  }
}

Enemy.prototype.drawEnemyAtkAnimation = function(name, x, y){
  var that = this;
  //DONE IT PASSES THIS! console.log("that name = " + this.name);
  function getAnimation(name, obj){
    if(name === "Mettaur"){
      //PASSES THE OBJ console.log("getAnimation was called for " + obj.name);
      mettaurAttackAnimation2(obj);
    
    }else if(name === "Pharaohman"){
      pharaohManLaser(obj);
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

  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk1.png", 145); mettaurWave.play();},800);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk2.png", 270); mettaurWave.stop(); mettaurWave.play();},1075);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk3.png", 395); mettaurWave.stop(); mettaurWave.play();},1350);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk4.png", 520); mettaurWave.stop(); mettaurWave.play();},1625);
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk5.png", 645); mettaurWave.stop(); mettaurWave.play();},1900);
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













