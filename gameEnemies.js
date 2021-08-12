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

// const bunny1 = new Enemy("Bunny", 90, 10, false, 20, "images/enemies/bunny/bunny.png", 7000, 2000, 0, 0);

//Bosses
class PharaohMan extends Enemy {
  constructor (name = "PharaohMan", hp = 200, dmg_output = 10, guard = false, attack_interval = 0, img = "images/enemies/pharaohman/PharaohMan1.png", 
              intervalSecs = 2000, timeOutSecs = 1500, x = 40, y = 40) {
    super(name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y)
  }
}
//Enemies END

Enemy.prototype.drawEnemy = function(img){
  ctx.clearRect(this.x, this.y, this.width, this.height);
  var enemyImage = new Image();
  enemyImage.src = img;
  var that = this;
  enemyImage.onload = ()=>ctx.drawImage(enemyImage, that.x, that.y, that.width, that.height);
  //check the placeArmy() to place on the battlefield;
};

Enemy.prototype.enemyAttackInterval = function(){
  var that = this;
  if (this.hp > 1) {
    var everything = setInterval(()=>this.enemyAttackTimeOut(this, everything) ,this.intervalSecs + Math.floor(Math.random() * 3)); 
  }
};

Enemy.prototype.enemyAttackTimeOut = function(context, interval){
  const that = this;

  function getAnimation1(obj) {
    if (obj.name === "Mettaur"){
      mettaurAttackAnimation1(obj);
      that.drawEnemyAtkAnimation(that.name, that.x, that.y);

    } else if (obj.name === "PharaohMan"){
      pharaohManAttackAnimation1(obj);
    }
  }
  
  if (this.hp > 0){
      getAnimation1(this);

  } else {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    clearInterval(interval);
  }

};

function enemyHpDisplay(enemy){
  //lots of playing to show their hp right
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

function allEnemiesAtk(round){}


