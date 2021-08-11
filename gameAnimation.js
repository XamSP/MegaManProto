Megaman.prototype.drawMegaMan = function(img) {
  ctx.clearRect(this.x,this.y,this.width,this.height);
  if(!img)
    img = this.img;
  var megaManImage = new Image();
  megaManImage.src = img;
  var that = this;
  megaManImage.onload = ()=>ctx.drawImage(megaManImage, that.x, that.y, that.width, that.height);
};


Megaman.prototype.drawMegaMan2 = function(img) {
  ctx4.clearRect(this.x,this.y,this.width,this.height);
  if(!img)
    img = this.img;
  var megaManImage = new Image();
  megaManImage.src = img;
  var that = this;
  megaManImage.onload = ()=>ctx4.drawImage(megaManImage, that.x, that.y, that.width, that.height);
};


Enemy.prototype.animation = function(){
  if (this.name === "Pharaohman") {
    pharaohManHovering(this);
  }
}

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
  
  //make sure to fix pharaohMan

  if(pharaohMan.hp < 1){
    clearInterval(getId());
  } 
    
}

function pharaohManTrap(obj) {
  let trap = new EnemyAtkAnimation(obj);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
  setTimeout(()=>{trap.drawTheAtkAnimation("images/enemies/pharaohman/.../...png", obj.x);},100);
// add pharoahMans trap atk!
}

function pharaohManLaser(obj) {
  let laser = new EnemyAtkAnimation(obj);
  laser.width += 250;
  laser.height += 20;
  laser.x -= 100
  //it has animations and the ..11.png has the the dmgReceived
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL.png", obj.x);},100);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL0.png", obj.x);},200);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL4.png", obj.x);},300);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL5.png", obj.x);},400);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL6.png", obj.x);},500);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL7.png", obj.x);},600);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL8.png", obj.x);},700);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL9.png", obj.x);},800);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL10.png", obj.x);},900);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL11.png", obj.x);dmgReceived(obj);},1000);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL12aa.png", obj.x);},1100);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL13a.png", obj.x);},1200);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL14a.png", obj.x);},1300);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL15a.png", obj.x);},1400);
  setTimeout(()=>{laser.drawTheAtkAnimation("images/enemies/pharaohman/Laser/PharaohmanL16a.png", obj.x);},1500);
  setTimeout(()=>{ctx2.clearRect(laser.x - obj.x, laser.y, laser.width, laser.height);},1550);
}

function pharaohManAttackAnimation1(obj){
  pharaohManLaser(obj);
}

function swordAnimation() {
  ctx.clearRect(140,320,100,60);
  currentMegaMan.x = currentTargetIcon.x- 80;
  currentMegaMan.y = currentTargetIcon.y -10;
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
  setTimeout(()=>{currentMegaMan.drawMegaMan2("images/megaman/sword/sword11.png");},510);
  setTimeout(()=>{ctx4.clearRect(currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);currentMegaMan.x = 140;currentMegaMan.y=320;currentMegaMan.width=100;currentMegaMan.height=60;},581);
  setTimeout(()=>{currentRound.map(x=> enemyHpDisplay(x));currentMegaMan.drawMegaMan(); notGuarding();},600);
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
//RELATED
function EnemyAtkAnimation(obj){
  this.x = 720 +100;
  this.y = obj.y;
  this.meme = "old meme";//just to test
  this.width = 60;
  this.height = 60;
  this.img = "";
}

function WinFrame() {
  this.x = 350;
  this.y = 300;
  this.width = 200;
  this.height = 60;
  this.img = "images/win-animation/Win7.png";
  this.drawWinAnimation = function(img) {
    ctx.clearRect(this.x,this.y,this.width,this.height);
    if(!img)
      img = this.img;
    let winImage = new Image();
    winImage.src = img;
    let that = this;
    winImage.onload = ()=>ctx.drawImage(winImage, that.x, that.y, that.width, that.height);
  
  }
}

function winAnimation() {
  const win = new WinFrame();
  const winPics = ["images/win-animation/Win1.png","images/win-animation/Win2.png", 
  "images/win-animation/Win3.png", "images/win-animation/Win4.png", "images/win-animation/Win5.png",
  "images/win-animation/Win6.png", "images/win-animation/Win7.png","images/win-animation/Win8.png"
  ];

  //for (i=0; i < winPics.length; i++){

    setTimeout(()=>{win.drawWinAnimation(winPics[0])}, 1 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[1])}, 2 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[2])}, 3 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[3])}, 4 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[4])}, 5 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[5])}, 6 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[6])}, 7 * 100);
    setTimeout(()=>{win.drawWinAnimation(winPics[7])}, 8 * 100);
    // if(i == winPics.length -1)
    setTimeout(()=>ctx.clearRect(350,300,200,60), 9 * 100);

  //}

    //200 * 8 = 1600 (1.6 seconds)
  
  //winTune.play();
}

EnemyAtkAnimation.prototype.drawTheAtkAnimation = function(img, x){
  //PASSES THE MEME OF THE OBJ OF ATKANIMATION console.log('Does mettaurAttackAnimation2 take the obj ' + this.meme);
  ctx2.clearRect(this.x - x +125, this.y, this.width, this.height);
  reDrawEnemyHp(currentRound);
  var enemyAtkImage = new Image();
  enemyAtkImage.src = img;
  var that = this;
  enemyAtkImage.onload = ()=>ctx2.drawImage(enemyAtkImage, that.x - x, that.y, that.width, that.height);
  reDrawGuard();
  // console.log(`The x, y in laser is ${that.x - x} ${that.y}`)
  /*PASSES THE IMG console.log("the img is "+img)*/;
};
//RELATED END

Enemy.prototype.drawEnemyAtkAnimation = function(name, x, y){//
  var that = this;
  //DONE IT PASSES THIS! console.log("that name = " + this.name);
  function getAnimation(name, obj){
    if(name === "Mettaur"){
      //PASSES THE OBJ console.log("getAnimation was called for " + obj.name);
      mettaurAttackAnimation2(obj);
    
    }else if(name === "Pharaohman"){
      //pharaohManLaser(obj);
    }
  }
  getAnimation(this.name, this);
  /*n
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
  setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk5.png", 645); mettaurWave.stop(); mettaurWave.play(); dmgReceived(obj)},1900);
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

function reDrawGuard(){
  var guardImg = new Image();
  guardImg.src = "images/megaman/guard/guardx.png";
  
  if (currentMegaMan.guard === true && currentMegaMan.x === 140){
    guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
  }
} 

