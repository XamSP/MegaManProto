//Targeting and Placement
function placeArmy(round) {
    switch (round.length) {
      case 3 :
        round[0].x = 740;
        round[0].y = 240;
        
        round[1].x = 680;
        round[1].y = 320;
        round[1].intervalSecs = round[1].intervalSecs * 1.2;
        
        round[2].x = 740;
        round[2].y = 380 ;
        round[2].intervalSecs = round[2].intervalSecs * 1.4;
        break;
  
      case 2 : 
        round[0].x = 720;
        round[0].y = 240;
        
        round[1].x = 720;
        round[1].y = 380;
        round[1].intervalSecs = round[1].intervalSecs * 1.2;
        break;
  
      case 1 :
        round[0].x = 720;
        round[0].y = 300;
        break;
  
      default : 
        console.log("No army or more than three!");
        break;
    }
  }

function megabar() { //Just Megaman's mugshot
  var bar = new Image();
  if(currentMegaMan.hp < 31) {
    bar.src = "images/battlefield-misc/megamanStatus/mmfaceWeak.png";

  } else {
    bar.src = "images/battlefield-misc/megamanStatus/mmface.png";
  }

  bar.onload = ()=>ctx.drawImage(bar,30,80,80,30);
}

function keysDisplay() {
  console.log("here");

  ctx2.font = "30px MMBNThick"; 
  ctx2.fillStyle = 'white';
  

  var keyA = new Image(); var keyW = new Image();
  var keyD = new Image(); var keyS = new Image();

  keyA.src = 'images/chips/chips sprite/withoutRow/Guard.png'; keyW.src = 'images/chips/chips sprite/withoutRow/Spreader.png';
  keyD.src = 'images/chips/chips sprite/withoutRow/Cannon.png'; keyS.src = 'images/chips/chips sprite/withoutRow/Sword.png';

  keyA.onload = () => ctx.drawImage(keyA, 30, 450,70,50);  ctx2.fillText("A", 30, 470);
  keyW.onload = () => ctx.drawImage(keyW, 100, 400,70,50); ctx2.fillText("W", 100, 420);
  keyD.onload = () => ctx.drawImage(keyD, 170, 450,70,50); ctx2.fillText("D", 170, 470);
  keyS.onload = () => ctx.drawImage(keyS, 100, 500,70,50); ctx2.fillText("S", 100, 520);

}

function startEnemyHpDisplay(round) {
  round.map(enemy => enemyHpDisplay(enemy));
}