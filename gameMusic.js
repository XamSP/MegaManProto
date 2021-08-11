function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.sound.isItPlaying = false;
  this.play = function(){
      this.sound.play();
      this.sound.isItPlaying = true;
  }
  this.stop = function(){
      this.sound.pause();
      this.sound.isItPlaying = false;
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
    if (virusBustingBGM.isItPlaying) {
      //Its playing...do your job
      naviBattleBGM.play();

    } else {
      //Not playing...maybe paused, stopped or never played.
      virusBustingBGM.stop()
      naviBattleBGM.play();
    };
    
  } else {
      if (naviBattleBGM.isItPlaying) {
      //Its playing...do your job
      naviBattleBGM.stop();
      virusBustingBGM.play();

      } else {
      //Not playing...maybe paused, stopped or never played.
      virusBustingBGM.play();
    };
  }
}

//Need to find the win jingle
const winTune = new sound("") 