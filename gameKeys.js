//Keys for controls for player
document.onkeyup = function(e){
    var key = e.keyCode;
   
    action(key);
    currentTargetIcon.move(key);
};

TargetIcon.prototype.move = function(number) {

  var that = this;
  switch(number){
    case 38: //the key ' ^ '
      targetUp(currentRound);
      drawTargetStuff(currentRound, that);
      break;

      //Testing to see if I can ignore the erasing and drawing if the army.length = 1
    case 40: //the key ' \/ '
      targetDown(currentRound);
      drawTargetStuff(currentRound, that);
      break;

    case 999:
      autoTargetDown(currentRound);
      drawTargetStuff(currentRound, that);
      break;  

    default:
      break;
  }
}

function action(key) {
    //the "WASD and space button"
    switch(key) {
      case 87: //the key 'W'
        buster();
        break;
  
      case 65: //the key 'A'
        guarding();
        break;
  
      case 83: //the key 'S'
        sword();
        break;
  
      case 68: //the key 'D'
        cannon();
        break;  
      
      //case : //the key ''
        //if(fourthCard.cooldown /*>=30%*/){
        //fourthCard.cardActivate();
        //break;
  
      default:
        break;
    }
}