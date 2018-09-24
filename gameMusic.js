function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }
}

const mainTheme = new sound("music/MMBN1 Theme Of Rockman Exe.mp3");

const battleStart = new sound("music/goinbtl HQ.wav");

const busterShot = new sound("music/BusterShot.wav");

const dmgDishedSound = new sound("music/Damage.wav");

const naviBattleBGM = new sound("music/MMBN1Navi Battle.mp3");

const virusBustingBGM = new sound("music/MMBN2 Virus Busting.mp3");

//trim
const shieldDrawedSound = new sound("music/ShieldNCP HQ.wav");

const shielded = new sound("music/Shielded.wav");

//louder
const mettaurWave = new sound("music/MettWave3.wav");

//trim and louder
const targetSound = new sound("music/ScopeLock HQ.wav");

const hurt = new sound("music/Hurt HQ.wav");

const deleted = new sound("music/Deleted HQ.wav");

const enemyDeleted = new sound("music/explode HQ.ogg");

function backgroundMusic(setOfRounds, round) {
  
  var isPlaying = function (mySound) {
    return mySound
        && mySound.currentTime > 0
        && !mySound.paused
        && !mySound.ended
        && mySound.readyState > 2;
}

  if(currentRound[0].hp > 99){
    if (!virusBustingBGM.paused && virusBustingBGM.currentTime) {
      //Its playing...do your job
      console.log('1 sound');
      naviBattleBGM.play();

    } else {
      //Not playing...maybe paused, stopped or never played.
      console.log('2 sound');
      console.log(isPlaying(virusBustingBGM));
      virusBustingBGM.pause()
      naviBattleBGM.play();
    };
    
  } else {
      if (!naviBattleBGM.paused && naviBattleBGM.currentTime) {
      //Its playing...do your job
      console.log('3 sound');
      naviBattleBGM.pause();
      virusBustingBGM.play();

      } else {
      //Not playing...maybe paused, stopped or never played.
      console.log('4 sound');
      console.log(virusBustingBGM);
      virusBustingBGM.play();
      console.log(virusBustingBGM.duration);  
    };
  }
}

//Need to find the win jingle
const winTune = new sound("") 