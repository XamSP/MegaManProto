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
