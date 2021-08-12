//Round Mechanics
function draw(round) {
    placeArmy(round);
    round.map(x => x.drawEnemy(x.img));
    round.map(x => x.enemyAttackInterval());
    round.map(x => x.animation());
    currentRound = round;

    //Checking if Megaman is drawn/alive
    if(!currentMegaMan) {
      currentMegaMan = new Megaman();

    } else {
      currentMegaMan.hp += 40; //Recover after battle
      currentMegaMan.drawMegaMan(); //Just draw Megaman without initializing another object of Megaman
    }

    //Place TargetIcon on enemy(s)
    autoTarget(round);
    currentTargetIcon = new TargetIcon(round).drawTargetIcon();
    currentTargetIcon = new TargetIcon(round);
    
    //Drawing and music
    updateHp();
    startEnemyHpDisplay(round);
    guardGauge(currentMegaMan);
    backgroundMusic(round);
    megabar(); //Megaman's Mugshot
    //displayActions();
  }

function startRound(){
    startGame(); //might change later, to call the first two functions'getArmy and autoTarget'.
    currentHP();
}

function currentHP() {}

function gameEnd() {}

//Round Mechanics END

//Hp, Gauges, and dmgs. 

//Megamans Battle-Functions
function updateHp() {
    /* This what happens when enemy hits and triggers this 
    function, probably need to update this when I add healing */
     if (currentMegaMan.hp > 0) {
        ctx2.clearRect(0 ,0 ,80, 80);
        ctx2.font = "30px Arial";
        ctx2.fillStyle = 'white';
        ctx2.fillText(currentMegaMan.hp, 30, 30);

     } else {
        ctx2.clearRect(0,0,80,80);
        deleted.play();
        currentMegaMan = null;
        ctx.clearRect(140,320,100,60);
    
        //refresh page to start again
        setTimeout(()=>{document.location.reload()}, 1000);
     }
}

function dmgDished(round, dmg) {
  
  for (i = 0; i < round.length; i++) {
    
    if (round[i].targeted === true) {
      //random dmg since I haven't implemented the buster
      round[i].hp -= dmg;
      enemyHpDisplay(round[i]);
      dmgDishedSound.play();

      if (round[i].hp <= 0) {
        spliceFromRound(round, round[i]);
      }
    }
  }
}

function updateGuardCooldown(){
    //the guard that megaman uses to shield atks from enemies
    ctx2.clearRect(0 ,40 ,110, 80);
    ctx2.font = "30px Arial"; 
    ctx2.fillStyle = 'white';
    ctx2.fillText(currentMegaMan.guard_cooldown + "%", 30, 70);
}

function dmgReceived(enemy) {
    //dmg megaman takes if he is not guarding (also dodging counts as guarding once implemented!)
    if(currentMegaMan.guard === true){
      shielded.play(); //sound when guarded

    } else if (currentMegaMan.guard === false && enemy.hp > 0){
      //Here he is taking damage
      currentMegaMan.hp -= enemy.dmg_output; 
      updateHp();
      hurt.play(); //sound
    }
  }
//Megamans Battle-Functions END