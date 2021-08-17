Megaman.prototype.drawMegaMan = function(img, extraWidth = 0, extraHeight = 0) {
  ctx.clearRect(this.x, this.y - extraHeight, this.width + extraWidth, this.height + extraHeight);
  if(!img)
    img = this.img;
  var megaManImage = new Image();
  megaManImage.src = img;
  var that = this;
  megaManImage.onload = ()=>ctx.drawImage(megaManImage, that.x, that.y - extraHeight, that.width + extraWidth, that.height + extraHeight);
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

class BattleNotificationFrame {
  constructor() {
    this.x = 350;
    this.y = 300;
    this.width = 50;
    this.height = 10;
    this.img;
    this.drawAnimation = function(img) {
      ctx.clearRect(this.x,this.y,this.width * 4,this.height * 4);
      if(!img)
        img = this.img;
      let winImage = new Image();
      winImage.src = img;
      let that = this;
      winImage.onload = ()=>ctx.drawImage(winImage, that.x, that.y, that.width * 4, that.height * 4);
    }
    this.eraseAnimation = function() {
      ctx.clearRect(this.x,this.y,this.width * 4, this.height * 4);
    }
  }
}

function megamanDamagedAnimation() {
  currentMegaMan.drawMegaMan('images/megaman/damaged/megamanDmg3.png', -4); 
  currentMegaMan.atkCooldown = true;
  setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/damaged/megamanDmg2.png'), -4;}, 200);
  setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/damaged/megamanDmg1.png'), -4;}, 300);
  setTimeout(()=>{currentMegaMan.drawMegaMan(); currentMegaMan.atkCooldown=false;},400);
}

function busterAnimation() {
  currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster1.png');
  setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster2.png');},50);
  setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster3.png');},100);
  setTimeout(()=>{currentMegaMan.drawMegaMan(); currentMegaMan.atkCooldown=false;},150);
  dmgDished(currentRound, 1);
  busterShot.play();
}

function cannonAnimation() {
  ctx.clearRect(140,320,100,60);
  currentMegaMan.drawMegaMan('images/megaman/cannon/megamanCannon1.png', 25, 20);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon1.png", 27, 20);},50);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon2.png", 27, 20);},100);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon3.png", 27, 20);},150);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon4.png", 27, 20);},200);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon5.png", 27, 20);},250);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon6.png", 27, 20);},300);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon7.png", 27, 20);},350);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon8.png", 27, 20); dmgDished(currentRound, 20)},400);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon9.png", 27, 20);},450);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon10.png", 27, 20);},500);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon11.png", 27, 20);},550);
  setTimeout(()=>{currentMegaMan.drawMegaMan("images/megaman/cannon/megamanCannon12.png", 27, 20);},600);
  setTimeout(()=>{ctx4.clearRect(currentMegaMan.x, currentMegaMan.y, currentMegaMan.width, currentMegaMan.height);currentMegaMan.x = 140;currentMegaMan.y=320;currentMegaMan.width=100;currentMegaMan.height=60;},681);
  setTimeout(()=>{ctx.clearRect(200,300,200,100);currentMegaMan.atkCooldown=false;},650);
  setTimeout(()=>{currentRound.map(x=> enemyHpDisplay(x));currentMegaMan.drawMegaMan();},700);
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
  swordSwing.play();
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

function winAnimation() {
  const win = new BattleNotificationFrame();
  
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win1.png")}, 100);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win2.png")}, 200);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win3.png")}, 300);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win4.png")}, 400);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win5.png")}, 500);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win6.png")}, 600);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win7.png")}, 700);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win8.png")}, 800);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win7.png")}, 900);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win6.png")}, 1000);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win5.png")}, 1100);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win4.png")}, 1200);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win3.png")}, 1300);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win2.png")}, 1400);
  setTimeout(()=>{win.drawAnimation("images/battleNotification/win-animation/Win1.png")}, 1500);
  setTimeout(()=>{win.eraseAnimation()}, 1600);
}

function battleStartAnimation() {
  const battleStart = new BattleNotificationFrame();

  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle1.png')}, 100);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle2.png')}, 200);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle3.png')}, 300);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle4.png')}, 400);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle5.png')}, 500);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle6.png')}, 800);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle7.png')}, 900);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle6.png')}, 1000);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle5.png')}, 1100);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle4.png')}, 1200);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle3.png')}, 1300);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle2.png')}, 1400);
  setTimeout(()=>{battleStart.drawAnimation('images/battleNotification/battleStart-animation/battle1.png')}, 1500);
  setTimeout(()=>{battleStart.eraseAnimation()}, 1600);
}

function megamanDeletedNotificationAnimation() {
  const megamanDelNotification = new BattleNotificationFrame();

  setTimeout(()=>{megamanDelNotification.drawAnimation('images/battleNotification/megamanDeleted-animation/mmdeleted1.png')}, 100);
  setTimeout(()=>{megamanDelNotification.drawAnimation('images/battleNotification/megamanDeleted-animation/mmdeleted2.png')}, 200);
  setTimeout(()=>{megamanDelNotification.drawAnimation('images/battleNotification/megamanDeleted-animation/mmdeleted3.png')}, 300);
  setTimeout(()=>{megamanDelNotification.drawAnimation('images/battleNotification/megamanDeleted-animation/mmdeleted2.png')}, 800);
  setTimeout(()=>{megamanDelNotification.drawAnimation('images/battleNotification/megamanDeleted-animation/mmdeleted1.png')}, 900);
  setTimeout(()=>{megamanDelNotification.eraseAnimation()}, 1000);
}

function reDrawGuard(){
  var guardImg = new Image();
  guardImg.src = "images/megaman/guard/guardx.png";
  
  if (currentMegaMan.guard === true && currentMegaMan.x === 140){
    guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
  }
} 

