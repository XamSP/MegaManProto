Enemy.prototype.animation = function() {
    switch (this.name) {
        case "Swordy":

            break;

        case "CanDevil":

            break;

        case "PharaohMan":
            pharaohManHovering(this);
            break;

        default:
            break;
    }
}

EnemyAtkAnimation.prototype.drawTheAtkAnimation = function(img, x){
    ctx2.clearRect(this.x - x +125, this.y, this.width, this.height);
    reDrawEnemyHp(currentRound);
    var enemyAtkImage = new Image();
    enemyAtkImage.src = img;
    var that = this;
    enemyAtkImage.onload = ()=>ctx2.drawImage(enemyAtkImage, that.x - x, that.y, that.width, that.height);
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
          //swordyAttackAnimation2();
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
    this.x = 720 +100;
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

    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk1.png", 145); mettaurWave.play();},800);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk2.png", 270); mettaurWave.stop(); mettaurWave.play();},1075);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk3.png", 395); mettaurWave.stop(); mettaurWave.play();},1350);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk4.png", 520); mettaurWave.stop(); mettaurWave.play();},1625);
    setTimeout(()=>{mettaurAttackFrame.drawTheAtkAnimation("images/enemies/mettaur/mettaurAtk5.png", 645); mettaurWave.stop(); mettaurWave.play(); dmgReceived(obj)},1900);
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

function swordyAttackAnimation1() {

}

function swordyAttackAnimation2() {

}

function canDevilAttackAnimation1() {

}

function canDevilAttackAnimation2() {
    
}

function pharaohManHovering(pharaohMan){
    //Need to clear interval with the right ID
    function getId(){
        var hover = setInterval(()=>{pharaohManFrames(pharaohMan);}, 1200); 
        return hover;
    }
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
    if (pharaohMan.hp < 1) { clearInterval(getId()); } 
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