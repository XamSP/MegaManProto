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
    //switch //the "WASD and space button"
    switch(key) {
      case 87: //the key 'W'
        if(!currentMegaMan.atkCooldown && currentMegaMan.guard === false) {
          currentMegaMan.atkCooldown = true;
          
          //drawing
          currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster1.png');
          setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster2.png');},50);
          setTimeout(()=>{currentMegaMan.drawMegaMan('images/megaman/megaBuster/megaBuster3.png');},100);
          setTimeout(()=>{currentMegaMan.drawMegaMan(); currentMegaMan.atkCooldown=false;},150);
          dmgDished(currentRound, 3);
          busterShot.play();
        }
        break;
  
      case 65: //the key 'A'
        guarding();
        break;
  
      case 83: //the key 'S'
        function sword(){
        if (currentMegaMan.guard_cooldown >= 30 && currentMegaMan.guard === false){
            currentMegaMan.guard_cooldown -= 30;
            currentMegaMan.guard = true;
            
            //drawing
            swordAnimation();
          }
        }
        sword();
        break;
  
      //case 68: //the key 'D'
      //if(fourthCard.cooldown /*>=30%*/){
        //fourthCard.cardActivate();
  
        default:
          break;
      
    /*case 38: //the key ' ^ '
        targetUp();
        break;
  
      case 40: //the key ' \/ '
        targetDown();
        break;*/
  
      // case 32:
      //draw(round1);
        
    }
}