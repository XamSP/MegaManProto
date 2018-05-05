// GAME SETUP & CONTROLS
function startGame(){
  getArmy();
  autoTarget();
}

function startRound(){
  startGame(); //might change later, to call the first two functions'getArmy and autoTarget'.
  currentHP();
}

function cardActivate(){}

function getArmy(enemy){ //need improvement
  //get all enemies in the battlefield in the same round
  var army = [enemy];
  return army;
}

function autoTarget(enemy){
  var army = getArmy(enemy);
  return army[0].targeted = true;
}

function targetDown(){
  var army = getArmy();
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol
    }  else if (army[army.length - 1].targeted === true) {
      army[army.length - 1].targeted = false;
      return army[0].targeted = true;
    
    } else if (army[i].targeted === true) {
    army[i].targeted = false;
    return army[i+1] = true;
   }
  }
}

function targetUp(){ //
  var army = getArmy();
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol
    } else if (army[0].targeted === true) {
      army[0].targeted = false;
      return army[army.length -1].targeted = true;
    
    } else if (army[i].targeted === true) {
    army[i].targeted = false;
    return army[i-1] = true;
   }
  }
}

function action(key) {
  //switch //the "WASD and space button"
  switch(key) {
    case 87: //the key 'W'
    if(firstCard.cooldown /*>= 30%*/) {
      firstCard.cardActivate();
    }
      break;
    case 65: //the key 'A'
    if(secondCard.cooldown /*>= 30%*/){
      secondCard.cardActivate();
    }
      break;
    case 83: //the key 'S'
    if(thirdCard.cooldown /*>=30%*/){
       thirdCard.cardActivate();
     } 
      break;
    case 68: //the key 'D'
    if(fourthCard.cooldown /*>=30%*/){
      fourthCard.cardActivate();
    }
      break;
    case 38: //the key ' ^ '
    targetUp();
        
      break;
    case 40: //the key ' \/ '
    targetDown();

      break;
    default:
    console.log("lol");  
  }
}


function currentHP() {}

function dmgReceived() {}

// CHARACTERS & ENEMIES

var Megaman = function(){
  this.name = 'MegaMan.EXE';
  this.hp = 100;
  this.gauge = 100;//% //later
  this.guard_cooldown = 100;//% //later
  this.team = "player";
  this.img = 'images/megaman.png'; //change later :P
};

function Enemy(name, hp, dmg_output, guard, attack_interval) {
  this.name = name;
  this.hp = hp;
  this.dmg_output = dmg_output;
  this.guard = false;
  this.team = 'opponent';
  this.attack_interval = attack_interval;
  this.targeted = false;

}

var mettaur = new Enemy("Mettaur",40,20,false,20);

// CARD MECHANICS
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

function pickCards(){
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
  function limitTwoSameCards(){
    for(i = 0; i < deck.length; i++){
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













