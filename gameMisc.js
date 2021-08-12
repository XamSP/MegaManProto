class Objects {
    constructor(name, hp, img, intervalSecs, timeOutSecs, x, y) {
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.intervalSecs = intervalSecs;
        this.timeOutSecs = timeOutSecs;
        this.x = 0;
        this.y = 0;
        this.width = 60 + x;
        this.height = 60 + y;
        this.status = function() {
            if (this.hp > 0) {return true;} else {return false;}
        };
        this.targeted = false;
        this.team = 'opponent';
        this.guard = false;
    };
}

class Candle extends Objects {
    constructor(name = "Candle", hp = 20, img = "images/enemies/candevil/Candle1", 
                intervalSecs = 0, timeOutSecs = 0, x = 0, y = 0) {

        super(name, hp, img, intervalSecs, timeOutSecs, x, y);
    }
}

function candleAnimationLit() {

}

function candleAnimationBlue() {
    
}