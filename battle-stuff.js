//Round Mechanics
function draw(round) {
    placeArmy(round);
    round.map(x => x.drawEnemy(x.img));
    round.map(x => x.enemyAttackInterval());
    round.map(x => x.animation());
    currentRound = round;
    // currentMegaMan = new Megaman();  
    currentMegaMan = new Megaman();
    currentMegaMan.drawMegaMan(); 
    //autoTarget(round);
    autoTarget(round);
    currentTargetIcon = new TargetIcon(round).drawTargetIcon();
    currentTargetIcon = new TargetIcon(round);
    // placeTargetIcon(round);
    updateHp();
    startEnemyHpDisplay(round);
    guardGauge(currentMegaMan);
    backgroundMusic(round);
    megabar();
  }

function startRound(){
    startGame(); //might change later, to call the first two functions'getArmy and autoTarget'.
    currentHP();
}

function currentHP() {

}

function gameEnd(){

}
//Round Mechanics END

//Hp, Gauges, and dmgs. 

//Megamans Battle-Functions
function megabar(){
    //Just Megaman's mugshot
    var bar = new Image();
    bar.src = "images/background/mmface.png";
    bar.onload = ()=>ctx.drawImage(bar,30,80,80,30);
  }

function updateHp() {
    // $("#hp-bar").text(currentMegaMan.hp); just gonna canvas
    // this what happens when enemy hists and triggers this function, probably
      //need to update this when I add healing
     if(currentMegaMan.hp >= 1) {
     ctx2.clearRect(0 ,0 ,80, 80);
     ctx2.font = "30px Arial";
     ctx2.fillStyle = 'white';
     ctx2.fillText(currentMegaMan.hp, 30, 30);
     } else if (currentMegaMan.hp < 10) {
     ctx2.clearRect(0,0,80,80);
     deleted.play();
     currentMegaMan = null;
     ctx.clearRect(140,320,100,60);
   
     setTimeout(()=>{document.location.reload()},1000);
     // var gameover = document.getElementById("gameover");
     // gameover.style.display = block;
     }
}

function updateGuardCooldown(){
    //the guard that megaman uses to shield atks from enemies
    ctx2.clearRect(0 ,40 ,110, 80);
    ctx2.font = "30px Arial"; 
    ctx2.fillStyle = 'white';
    ctx2.fillText(currentMegaMan.guard_cooldown+"%", 30, 70);
    //ctx2.fillText("%",80, 90)
}

function dmgReceived(enemy) {
    //dmg megaman takes if he is not guarding (also dodging counts as guarding!)
    if(currentMegaMan.guard === true){
      shielded.play();//sound when guarded
    } else if (currentMegaMan.guard === false && enemy.hp >0){
      //here he's taking damage
      console.log(enemy);
      currentMegaMan.hp -= enemy.dmg_output;
      updateHp();
      hurt.play();
    } else {
      
    }
  
    console.log('Enemy atk impact!');
  }
//Megamans Battle-Functions END