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

var mainTheme = new sound("music/MMBN1 Theme Of Rockman Exe.mp3");

var battleStart = new sound("music/goinbtl HQ.wav");

var busterShot = new sound("music/BusterShot.wav");

var dmgDishedSound = new sound("music/Damage.wav");

var naviBattleBGM = new sound("music/MMBN1Navi Battle.mp3");

var virusBustingBGM = new sound("music/MMBN2 Virus Busting.mp3");

//trim
var shieldDrawedSound = new sound("music/ShieldNCP HQ.wav");

var shielded = new sound("music/Shielded.wav");

//louder
var mettaurWave = new sound("music/MettWave3.wav");

//trim and louder
var targetSound = new sound("music/ScopeLock HQ.wav");

var hurt = new sound("music/Hurt HQ.wav");

var deleted = new sound("music/Deleted HQ.wav");

var enemyDeleted = new sound("music/explode HQ.ogg");

function backgroundMusic(round) {
  if(round[0].hp > 99){
    naviBattleBGM.play();
  } else {
    virusBustingBGM.play();
  }
}

function refresh(){
  document.location.reload();
}
