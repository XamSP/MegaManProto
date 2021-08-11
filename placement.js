//Targeting and Placement
function placeArmy(round) {

    switch (round.length) {
      case 3 :
        round[0].x = 740;
        round[0].y = 280;
        
        round[1].x = 680;
        round[1].y = 320;
        
        round[2].x = 740;
        round[2].y = 340;
        break;
  
      case 2 : 
        round[0].x = 720;
        round[0].y = 280;
        
        round[1].x = 720;
        round[1].y = 340;
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

  function startEnemyHpDisplay(round) {
    round.map(enemy => enemyHpDisplay(enemy));
  }