var Megaman = function() {
    this.name = 'MegaMan.EXE';
    this.hp = 10000;
    this.gauge = 100;//% //later
    this.guard_cooldown = 100;//% //later
    this.atkCooldown = false;
    this.team = "player";
    this.x = 140;
    this.y = 320;
    this.width = 100;
    this.height = 60;
    this.img = "images/megaman/still/still1.png"; //change later :P
    this.guard = false;
    this.status = function() {if (this.hp > 0) {return true;} else {return false;}
    };
  };
  
  //Guard
  
  function guarding() {
    var guardImg = new Image();
    guardImg.src = "images/megaman/guard/guardx.png";
  
    if (currentMegaMan.guard_cooldown >= 25 && currentMegaMan.guard === false) {
      currentMegaMan.guard = true;
      currentMegaMan.guard_cooldown -= 25;
  
      //drawing
      guardImg.onload = ()=>ctx2.drawImage(guardImg, currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
  
      //Sound Effect
      shieldDrawedSound.play();
      setTimeout(() => {if(currentMegaMan.guard === true){notGuarding();}},400);
    } 
  }
  
  function guardingS() {
      currentMegaMan.guard = true;
  }
  
  function notGuarding(){
    if (currentMegaMan.guard === true) {
      currentMegaMan.guard = false;
      shieldDrawedSound.stop();
      //drawing
      ctx2.clearRect(currentMegaMan.x + 50, currentMegaMan.y, currentMegaMan.width / 2, currentMegaMan.height);
    }
  }
  
  function buster() {
    if(!currentMegaMan.atkCooldown && currentMegaMan.guard === false) {
        currentMegaMan.atkCooldown = true;
        
        //drawing
        busterAnimation();
    }
  }
  function sword(){
        if (currentMegaMan.guard_cooldown >= 30 && currentMegaMan.guard === false) {
            currentMegaMan.guard_cooldown -= 30;
            currentMegaMan.guard = true;
            
            //drawing
            swordAnimation();
        }
    }

  function cannon() {
    if (!currentMegaMan.atkCooldown && currentMegaMan.guard_cooldown >= 20 && currentMegaMan.guard === false) {
        currentMegaMan.guard_cooldown -= 30;
        currentMegaMan.atkCooldown = true;

        //drawing
        cannonAnimation();
    }
  }

  function guardGauge(megaman){
    var guardInterval = setInterval(() => guardRegen(megaman), 60);
    clearInterval();
  
    function guardRegen(megaman){
      if(megaman.guard_cooldown >= 100){
        updateGuardCooldown();
  
      } else {
        megaman.guard_cooldown += 1;
        updateGuardCooldown();
      }
    }
  }
  
  // CARD MECHANICS - TO BE IMPLEMENTED...
  function Card(dmg, name, rank, effect) {
    this.dmg = dmg;
    this.name = name;
    this.rank = rank;
    this.effect = effect;
  }
  
  var search = new Card(0, "Search", "standard", function(){});
  var shootingStars = new Card(30, "Shooting Stars", "mega", function(){});
  
  //var template = document.getElementbyId("x");
  //template.innerText("yes");
  
  function cardActivate(){}
  
  function pickCards() {
    var deck = [];
    
    function limitOneMegaCards(){
      for(i = 0; i < deck.length; i++){
        var megaLimit = 0;
        if (megaLimit === 2) {
          return deck[i] /*to the library*/;
        } else if (deck[i].rank === "mega"){
          megaLimit += 1;
        } else {continue;}
      }
    }
  
    function limitTwoSameCards() {
      for(i = 0; i < deck.length; i++) {
        var multipleLimit = 0;
        if (multipleLimit = 3) {
          return deck[i]/*to the library*/; 
        } //else if (deck[i].name === deck[j].name){multipleLimit+=1}
      }
    
      if (deck === 10) {
        return "Ready";
      } else if (deck < 10) {
        return "Not ready";
      } else if (deck > 10) {
        //not finish coding
        return deck[10] + " 10 is the limit!"
      }
    }
}
