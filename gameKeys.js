//Keys for controls for player
document.onkeyup = function(e){
    var key = e.keyCode;
   
    if (gameStarted) {
      action(key);
      currentTargetIcon.move(key);  
    }
};

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

function actionToTarget(number, obj) {
  switch(number){
    case 38: //the key ' ^ '
      targetUp(currentRound);
      drawTargetStuff(currentRound, obj);
      break;

      //Testing to see if I can ignore the erasing and drawing if the army.length = 1
    case 40: //the key ' \/ '
      targetDown(currentRound);
      drawTargetStuff(currentRound, obj);
      break;

    case 999:
      if(currentRound.length > 1) {
        autoTargetDown(currentRound);
        drawTargetStuff(currentRound, obj);

      } else {
        eraseTargetStuff(obj);
      }
      break;  

    default:
      break;
  }
}