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
  setTimeout(()=>{round1.map(x=> enemyHpDisplay(x));currentMegaMan.drawMegaMan(); notGuarding();},600);
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

function reDrawGuard(){
  var guardImg = new Image();
  guardImg.src = "images/megaman/guard/guardx.png";
  
  if (currentMegaMan.guard === true && currentMegaMan.x === 140){
    guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
  }
} 