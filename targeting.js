function autoTarget(round){
    var army = round;
    targetSound.play();
    return army[0].targeted = true;
  }
  
function targetDown(round){
  var army = round;
  
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1) {
    //nothing lol

    } else if (army[army.length - 1].targeted === true && army[army.length - 1].status() === true) {
      army[army.length - 1].targeted = false;
      army[0].targeted = true;
      targetSound.play();
      break;
    
    } else if (army[i].targeted === true && army[i].status() === true) {
      army[i].targeted = false;
      army[i+1].targeted = true;
      targetSound.play();
      break;
    }
  }
}

function targetUp(round){ //
  var army = round;
  //for loop to change the target 
  for(var i = 0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol

    //if status is false (dead), remove from the round army and target next to them
    } else if (army[0].targeted === true && army[0].status() === true) {
      army[0].targeted = false;
      army[army.length -1].targeted = true;
      targetSound.play();
      break;
    
    } else if (army[i].targeted === true && army[i].status() === true) {
      army[i].targeted = false;
      army[i-1].targeted = true;
      targetSound.play();
      break;
    }
  }
}

function autoTargetDown(round){
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
  
  if(army[army.length - 1].targeted === true){
    army[army.length - 1].targeted = false;
    army[0].targeted = true;
    break;
  

  }else if (army[i].targeted === true){
    army[i].targeted = false;
    army[i+1].targeted = true;
    break; 
  }
  }
}

function targetforDrawing(round){ 
  var army = round;
  //for loop to change the target 
  for(var i=0; i < army.length; i++) {
    if (army.length === 1){
      //nothing lol
    } else if (army[i].targeted === true) {
      return army[i];
    } 
  }
}

function drawTargetStuff(round, that){
  var army = round;
  if (army.length === 1){
    //nothing

  } else {
    ctx3.clearRect(that.x, that.y, that.width, that.height);
    var cordinates = targetforDrawing(currentRound);
    currentTargetIcon.x = cordinates.x;
    currentTargetIcon.y = cordinates.y;
    currentTargetIcon.width = cordinates.width;
    currentTargetIcon.height = cordinates.height;
    currentTargetIcon.drawTargetIcon(); 
  }
}