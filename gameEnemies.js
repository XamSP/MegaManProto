class Enemy {
  constructor (name, hp, dmg_output, guard, attack_interval, img, intervalSecs, timeOutSecs, x, y) {
    this.name = name;
    this.hp = hp;
    this.dmg_output = dmg_output;
    this.guard = false;
    this.team = 'opponent';
    this.attack_interval = attack_interval;
    this.targeted = false;
    this.status = function() {
      if (this.hp > 0) {return true;} else {return false;}
    };
    this.x = 0;
    this.y = 0;
    this.width = 60 + x;
    this.height = 60 + y;
    this.img = img;
    this.intervalSecs = intervalSecs;
    this.timeOutSecs = timeOutSecs;
    this.intervalID;
  };
}

//Enemies
//Viruses, Got to turn them into a class
class Mettaur extends Enemy {
  constructor (name = "Mettaur", hp = 40, dmg_output = 10, guard = false, attack_interval = 20, img = "images/enemies/mettaur/mettaur.png", 
              intervalSecs = 3000, timeOutSecs = 2000, x = 0, y = 0) {

    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y);
  }
}

class Bunny extends Enemy {
  constructor(name = "Bunny", hp = 50, dmg_output = 20, guard = false, attack_interval = 30, img = "images/enemies/bunny/bunny1.png", 
              intervalSecs = 3000, timeOutSecs = 2000, x = 0, y = 0) {

    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y);
  }
}

class Billy extends Enemy {
  constructor(name = "Billy", hp = 40, dmg_output = 30, guard = false, attack_interval = 40, img = "images/enemies/billy/billy1.png", 
  intervalSecs = 3000, timeOutSecs = 2000, x = 0, y = 0) {
    
    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y);
  }
}

class Swordy extends Enemy {
  constructor(name = "Swordy", hp = 60, dmg_output = 30, guard = false, attack_interval = 30, img = "images/enemies/swordy/swordyStill1.png", 
              intervalSecs = 3000, timeOutSecs = 2000, x = 40, y = 40) {

    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y);
  }
}

class CanDevil extends Enemy {
  constructor(name = "CanDevil", hp = 70, dmg_output = 20, guard = false, attack_interval = 20, img = "images/enemies/candevil/CanDevil1.png", 
              intervalSecs = 3000, timeOutSecs = 2000, x = 0, y = 0){
    
    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y);
  }
}

class Lavagon extends Enemy {
  constructor(name = "Lavagon", hp = 120, dmg_output = 40, guard = false, attack_interval = 30, img = "images/enemies/lavagon/lavagon1.png", 
              intervalSecs = 3000, timeOutSecs = 2000, x = 0, y = 0) {

    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y);
  }
}

//Bosses
class PharaohMan extends Enemy {
  constructor (name = "PharaohMan", hp = 200, dmg_output = 10, guard = false, attack_interval = 0, img = "images/enemies/pharaohman/PharaohMan1.png", 
              intervalSecs = 2000, timeOutSecs = 1500, x = 40, y = 40) {
                
    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y)
  }
}

Enemy.prototype.enemyAttackInterval = function(){
  var that = this;
  if (this.hp > 1) {
    var everything = setInterval(()=>this.enemyAttackTimeOut(this, everything) ,this.intervalSecs + Math.floor(Math.random() * 3)); 
  }
};

Enemy.prototype.enemyAttackTimeOut = function(context, interval){
  const that = this;

  function getAnimation1(obj) {
    var enemyName = obj.name;

    switch (enemyName) {
      case "Mettaur":
        mettaurAttackAnimation1(obj);
        that.drawEnemyAtkAnimation(that.name, that.x, that.y);
        break;

      case "Billy":
        //billyAttackAnimation1(obj);
        //that.drawEnemyAtkAnimation(that.name, that.x, that.y);
        break;

      case "Bunny":
        //bunnyAttackAnimation1(obj);
        //that.drawEnemyAtkAnimation(that.name, that.x, that.y);
        break;

      case "Swordy":
        swordyAttackAnimation1(obj);
        that.drawEnemyAtkAnimation(that.name, that.x, that.y);
        break;

      case "CanDevil":
        canDevilAttackAnimation1(obj);
        that.drawEnemyAtkAnimation(that.name, that.x, that.y);
        break;

      case "PharaohMan":
        pharaohManAttackAnimation1(obj);
        break;

      default:
        console.log("Animation not found!");
        break;
    }
  }
  
  if (this.hp > 0){
      getAnimation1(this);

  } else {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    clearInterval(interval);
  }
};
//Mettaur.prototype.enemyAttackTimeOut

function enemyHpDisplay(enemy){

  if (currentRound <= 0) {return 0}

  if(enemy.hp >= 1 && enemy.width === 60) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -20, enemy.width, enemy.height);
    ctx2.font = "30px MMBNThick";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  
  } else if (enemy.hp >= 100){
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px MMBNThick";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  
  }else if (enemy.hp >= 1 && enemy.hp <=99 && enemy.width === 60){
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px MMBNThick";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 4), enemy.y + enemy.height+10);
  
  
  }else if (enemy.hp >= 1 && enemy.hp <=99){
    ctx2.clearRect(enemy.x + (enemy.width / 4) -20, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
    ctx2.font = "30px MMBNThick";
    ctx2.fillStyle = 'white';
    ctx2.fillText(enemy.hp, enemy.x + (enemy.width / 3), enemy.y + enemy.height+10);
  
  }else if (enemy.hp < 1) {
    ctx2.clearRect(enemy.x + (enemy.width / 4) -10, enemy.y + enemy.height + (enemy.height / 8) -30, enemy.width, enemy.height);
  }
}

function allEnemiesAtk(round){}