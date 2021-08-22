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
  // this.increaseVol = function() {
  //   this.sound.volume += 0.2;
  // }
}


//mainTheme.sound.volume = 0.5;
const mainTheme = new sound("music/MMBN1 Theme Of Rockman Exe.mp3");

const battleStart = new sound("music/goinbtl HQ.wav");

const busterShot = new sound("music/BusterShot.wav");

const swordSwing = new sound("music/SwordSwing.wav");

const dmgDishedSound = new sound("music/Damage.wav");

const naviBattleBGM = new sound("music/MMBN1Navi Battle.mp3");

const virusBustingBGM = new sound("music/MMBN2 Virus Busting.mp3");

const chargingBuster = new sound("music/BusterCharging HQ.wav");

const chargedBuster = new sound("music/BusterCharged HQ.wav");

const invisNoise = new sound("music/TurnInvisible HQ.wav");

const attackInFullSynchro = new sound("music/UseChipWhileInFullSynchro HQ.wav");

const recoverHPSound = new sound("music/Recover HQ.wav");

const pauseSound = new sound("music/Pause HQ.wav");

const newGameSound = new sound("music/NewGame HQ.wav");

const peilHPSound = new sound("music/RedHP HQ.wav");

//trim
const shieldDrawedSound = new sound("music/ShieldNCP HQ.wav");

const shielded = new sound("music/Shielded.wav");

const winJingle = new sound("music/enemy_deleted_cutout.wav");

//louder
const mettaurWave = new sound("music/MettWave3.wav");

const flameSFX = new sound("music/flame2.wav");

//trim and louder
const targetSound = new sound("music/ScopeLock HQ.wav");

const hurt = new sound("music/Hurt HQ.wav");

const deleted = new sound("music/Deleted HQ2.wav");

const enemyDeleted = new sound("music/explode HQ.ogg");

let allSounds = [enemyDeleted, deleted, hurt, targetSound, flameSFX, mettaurWave, 
  winJingle, shielded, shieldDrawedSound, peilHPSound, pauseSound, recoverHPSound, 
  attackInFullSynchro, invisNoise, chargedBuster, chargingBuster, virusBustingBGM, 
  naviBattleBGM, dmgDishedSound, swordSwing, busterShot, battleStart, mainTheme, 
  pauseSound, recoverHPSound, attackInFullSynchro, invisNoise, chargedBuster, 
  chargingBuster, virusBustingBGM, naviBattleBGM, dmgDishedSound, swordSwing, 
  busterShot, battleStart, mainTheme];

let volume = document.querySelector("#volume-control");

volume.addEventListener("change", function(e) {
  for (let i in allSounds) {
    allSounds[i].sound.volume = e.currentTarget.value / 100;
  }
})

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
