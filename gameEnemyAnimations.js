Enemy.prototype.animation = function() {
    switch (this.name) {
        case "Swordy":
            swordyStillSwordFrames(this);
            break;

        case "CanDevil":
            canDevilFlamesLit(this);
            break;

        case "PharaohMan":
            pharaohManHovering(this);
            break;

        default:
            break;
    }
}

Enemy.prototype.drawEnemy = function(img){
    ctx.clearRect(this.x, this.y, this.width, this.height);
    var enemyImage = new Image();
    enemyImage.src = img;
    var that = this;
    enemyImage.onload = ()=>ctx.drawImage(enemyImage, that.x, that.y, that.width, that.height);
  };
  
  Enemy.prototype.drawEnemyRightOfMegaman = function(img){
    //ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx3.clearRect(currentMegaMan.x + 40, currentMegaMan.y - 40, this.width, this.height);
    var enemyImage = new Image();
    enemyImage.src = img;
    var that = this;
    enemyImage.onload = ()=>ctx3.drawImage(enemyImage, currentMegaMan.x + 40, currentMegaMan.y - 40, that.width, that.height);
  };

EnemyAtkAnimation.prototype.drawTheAtkAnimation = function(img, x, xForClearingFrameBefore = 0, y = 0){
    ctx2.clearRect(this.x - x + xForClearingFrameBefore, this.y + y, this.width, this.height);
    reDrawEnemyHp(currentRound);
    var enemyAtkImage = new Image();
    enemyAtkImage.src = img;
    var that = this;
    console.log(that.x);
    enemyAtkImage.onload = ()=>ctx2.drawImage(enemyAtkImage, that.x - x, that.y + y, that.width, that.height);
    reDrawGuard();
};

Enemy.prototype.drawEnemyAtkAnimation = function(name, x, y) {
    var that = this;
    function getAnimation(name, obj){
  
      switch (name) {
        case "Mettaur":
          mettaurAttackAnimation2(obj);
          break;
  
        case "Billy":
          //billyAttackAnimation();
          break;
  
        case "Bunny":
          //bunnyAttackAnimation2();
          break;
  
        case "Swordy":
          swordyAttackAnimation2(obj);
          break;
  
        case "CanDevil":
          //canDevilAttackAnimation2();
          break;
  
        case "PharaohMan":
          //pharaohManLaser(obj);
          break;
  
        default:
          console.log("Animation not found!");
          break;
      }
    }
    getAnimation(this.name, this);
};

function EnemyAtkAnimation(obj){
    this.x = obj.x + 100;
    this.y = obj.y;
    this.meme = "old meme";//just to test
    this.width = 60;
    this.height = 60;
    this.img = "";
}

function reDrawEnemyHp(round) {
    var armyLength = round.length;

    switch (armyLength) {
        case 3:
            enemyHpDisplay(round[0]);
            enemyHpDisplay(round[1]);
            enemyHpDisplay(round[2]);
            break;

        case 2:
            enemyHpDisplay(round[0]);
            enemyHpDisplay(round[1]);
            break;

        default:
            enemyHpDisplay(round[0]);
            break;
    }
}

//Specific Enemy Animations

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

function mettaurAttackAnimation2(obj){
    var mettaurAttackFrame = new EnemyAtkAnimation(obj);

    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk1.png", 145, 125); mettaurWave.play();},800);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk2.png", 270, 125); mettaurWave.stop(); mettaurWave.play();},1075);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk3.png", 395, 125); mettaurWave.stop(); mettaurWave.play();},1350);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk4.png", 520, 125); mettaurWave.stop(); mettaurWave.play();},1625);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk5.png", 645, 125); mettaurWave.stop(); mettaurWave.play(); dmgReceived(obj)},1900);
    setTimeout(()=>{ctx2.clearRect(mettaurAttackFrame.x -645, mettaurAttackFrame.y, mettaurAttackFrame.width, mettaurAttackFrame.height)}, 2000);
    setTimeout(()=>{reDrawGuard();},2000);

    function clear(obj) {
        ctx2.clearRect(obj.x -500, obj.y, obj.width, obj.height);
    }
}

function billyAttackAnimation1() {

}

function billyAttackAnimation2() {

}

function bunnyAttackAnimation1() {

}

function bunnyAttackAnimation2() {

}

function swordyStillSwordFrames(swordy) {
    function getId(){
        var eminatingSword = setInterval(()=>{swordyEminatingFrames(swordy);}, 500); 
        return eminatingSword;
    }
    
    if (swordy.hp < 1) { 
        intervalObject.clear(swordy.intervalID);
    } else {
        swordy.intervalID = getId();
        intervalObject.intervals.add(swordy.intervalID);
    }

    function swordyEminatingFrames(swordy) {
      swordy.drawEnemy('images/enemies/swordy/swordyStill2.png');
      setTimeout(()=>{swordy.drawEnemy('images/enemies/swordy/swordyStill3.png');},100);
      setTimeout(()=>{swordy.drawEnemy('images/enemies/swordy/swordyStill4.png');},200);
      setTimeout(()=>{swordy.drawEnemy('images/enemies/swordy/swordyStill5.png');},300);
      setTimeout(()=>{swordy.drawEnemy('images/enemies/swordy/swordyStill6.png');},400);
      setTimeout(()=>{swordy.drawEnemy(swordy.img);},1000);
    };

}

function swordyAttackAnimation1(swordy) {
    swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordyStance1.png');
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordyStance2.png');},100);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordyStance3.png');},200);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordyStance4.png');},300);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordyStance5.png');},400);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordySwing1.png');},500);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordySwing2.png');},600);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordySwing3.png');},700);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordySwing4.png');},800);
    setTimeout(()=>{swordy.drawEnemyRightOfMegaman('images/enemies/swordy/swordySwing5.png');},900);
    setTimeout(()=>{ctx3.clearRect(currentMegaMan.x + 40, currentMegaMan.y - 40, swordy.width, swordy.height);},1400);
}

function swordyAttackAnimation2(obj) {
    var swordyAttackFrame = new EnemyAtkAnimation(obj);

    setTimeout(()=>{swordyAttackFrame.drawTheAtkAnimation("images/enemies/swordy/Slash1.png", 675, 0, 50);},800); swordSwing.play();
    setTimeout(()=>{swordyAttackFrame.drawTheAtkAnimation("images/enemies/swordy/Slash2.png", 675, 0, 50); dmgReceived(obj)}, 900);
    setTimeout(()=>{swordyAttackFrame.drawTheAtkAnimation("images/enemies/swordy/Slash3.png", 675, 0, 50);},1000);
    setTimeout(()=>{swordyAttackFrame.drawTheAtkAnimation("images/enemies/swordy/Slash4.png", 675, 0, 50);},1100);
    setTimeout(()=>{ctx2.clearRect(swordyAttackFrame.x -675, swordyAttackFrame.y, swordyAttackFrame.width, swordyAttackFrame.height)}, 1300);
    setTimeout(()=>{reDrawGuard();},1400);
}

function canDevilFlamesLit(candevil) {
    function getId(){
        var flames = setInterval(()=>{flameFrames(candevil);}, 1000); 
        return flames;
    }w

    if (candevil.hp < 1) { 
        intervalObject.clear(candevil.intervalID);
    } else {
       candevil.intervalID = getId();
       intervalObject.intervals.add(candevil.intervalID);
    }

    function flameFrames(candevil) {
        candevil.drawEnemy('images/enemies/candevil/CanDevil2.png');
        setTimeout(()=>{candevil.drawEnemy('images/enemies/candevil/CanDevil3.png');},200);
        setTimeout(()=>{candevil.drawEnemy('images/enemies/candevil/CanDevil4.png');},400);
        setTimeout(()=>{candevil.drawEnemy('images/enemies/candevil/CanDevil5.png');},600);
        setTimeout(()=>{candevil.drawEnemy(candevil.img);},800);
    }
}

function canDevilFlamesExtinguished(candevil){
    function getId(){
        var movement = setInterval(()=>{movementFrames(candevil);}, 1200); 
        return movement;
    }

    if (candevil.hp < 1) { 
        intervalObject.clear(candevil.intervalID);
    } else {
       candevil.intervalID = getId();
       intervalObject.intervals.add(candevil.intervalID);
    }

    function movementFrames(candevil) {
        candevil.drawEnemy('images/enemies/candevil/CanDevilUnlit2.png');
        setTimeout(()=>{candevil.drawEnemy('images/enemies/candevil/CanDevilUnlit3.png');},200);
        setTimeout(()=>{candevil.drawEnemy('images/enemies/candevil/CanDevilUnlit1.png');},800);
    }
}

function canDevilAttackAnimation1() {

}

function canDevilAttackAnimation2() {

}


function pharaohManHovering(pharaohMan){
    function getId(){
        var hover = setInterval(()=>{pharaohManFrames(pharaohMan);}, 1200); 
        return hover;
    }
  
    if (pharaohMan.hp < 1) { 
         intervalObject.clear(pharaohMan.intervalID);
    } else {
        pharaohMan.intervalID = getId();
        intervalObject.intervals.add(pharaohMan.intervalID);
    }

    function pharaohManFrames(pharaohMan){
      pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan2.png');
      setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan3.png');},200);
      setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan4.png');},400);
      setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan3.png');},600);
      setTimeout(()=>{pharaohMan.drawEnemy('images/enemies/pharaohman/PharaohMan2.png');},800);
      setTimeout(()=>{pharaohMan.drawEnemy(pharaohMan.img);},1000);
    };
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