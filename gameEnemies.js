let Enemy = function (name, hp, dmg_output, guard, attack_interval,img, intervalSecs, timeOutSecs, x, y) {
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

//Enemies
  //Viruses
  const mettaur = new Enemy("Mettaur",40,10,false,20,"images/enemies/mettaur/mettaur.png", 3000, 2000,0,0);

  const mettaur2 = new Enemy("Mettaur",90,20,false,20,"images/enemies/mettaur/mettaur.png", 5000, 2000,0,0);

  const mettaur3 = new Enemy("Mettaur",90,20,false,20,"images/enemies/mettaur/mettaur.png", 7000, 2000,0,0);
  const bunny1 = new Enemy("Bunny", 90, 10, false, 20, "images/enemies/bunny/bunny.png", 7000, 2000, 0, 0);
  //Bosses
  const pharaohMan = new Enemy("Pharaohman", 200, 10, false,0, "images/enemies/pharaohman/PharaohMan1.png",2000, 1500, 40,40);
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
  const that = this;
  function getAnimation1(obj) {
    if (obj.name === "Mettaur"){
      mettaurAttackAnimation1(obj);
      that.drawEnemyAtkAnimation(that.name, that.x, that.y);

    } else if (obj.name === "Pharaohman"){
      pharaohManAttackAnimation1(obj);
    }
  }
  
  if(this.hp > 0){
  getAnimation1(this);
  
 // setTimeout(dmgReceived, this.timeOutSecs, this);
  } else {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    clearInterval(interval);
    console.log("everything ded");
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


