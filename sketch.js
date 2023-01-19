// variables
let n_img = 0;

function preload(){
    // load images
    myLoad = loadImage("assets/images/intro.png");
    imgUptownfunk = loadImage("assets/images/uptownfunk.jpg");
    bg1 = loadImage("assets/images/bg.png");
    bg2 = loadImage("assets/images/bg.png");
    imgAllstar = loadImage("assets/images/allstar.jpg");
    imgBohemianrapsody = loadImage("assets/images/bohemianrapsody.jpg");
    imgBangbang = loadImage("assets/images/bangbang.jpg");
    imgTakeonme = loadImage("assets/images/takeonme.jpg");
    square1 = loadImage("assets/images/square.png");
    square2 = loadImage("assets/images/square.png");
    // load songs
    startSong = loadSound("assets/sounds/startSong.mp3");
    allStar = loadSound("assets/sounds/allStar.mp3");
    bangBang = loadSound("assets/sounds/bangBang.mp3");
    uptownFunk = loadSound("assets/sounds/uptownFunk.mp3");
    BohemianRapsody = loadSound("assets/sounds/bohemianRapsody.mp3");
    TakeOnMe = loadSound("assets/sounds/takeOnMe.mp3")
}

function setup() {
    createCanvas(windowWidth,windowHeight)
    background(0);

    analyzer = new p5.Amplitude();
    analyzer.setInput(uptownFunk);
    analyzer.setInput(allStar);
    analyzer.setInput(bangBang);
    analyzer.setInput(BohemianRapsody);
    analyzer.setInput(TakeOnMe);

    imageMode(CENTER);
    image(myLoad, width / 2, height / 2 - 180, 330, 215);

    // Button Play
    push();
    buttonplay = createImg("assets/images/myPlay.svg");
    buttonplay.style("width", "32px");
    buttonplay.position(width / 2 + 118, height / 2 + 250);
    buttonplay.mousePressed(playClicked);
    pop();
    // Button Pause
    push();
    buttonpause = createImg("assets/images/myPause.svg");
    buttonpause.style("width", "32px");
    buttonpause.position(width / 2 + 52, height / 2 + 250);
    buttonpause.mousePressed(pauseClicked);
    pop();
    // Button Next
    push();
    buttonnext = createImg("assets/images/myNext.svg");
    buttonnext.style("width", "32px");
    buttonnext.position(width / 2 - 72, height / 2 + 250);
    buttonnext.mousePressed(nextClicked);
    pop();
    // Button Back
    push();
    buttonback = createImg("assets/images/myBack.svg");
    buttonback.style("width", "32px");
    buttonback.position(width / 2 - 155, height / 2 + 250);
    buttonback.mousePressed(backClicked);
    pop();

    startSong.play();
}

function draw() {
    let volume = 0;
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, 250);

    if (allStar.isPlaying() || uptownFunk.isPlaying() || BohemianRapsody.isPlaying() || bangBang.isPlaying() || TakeOnMe.isPlaying()) {
        imageMode(CORNER);
        image(bg1, 0, 0, width / 2, height);
        image(bg2, width / 2, 0, width / 2, height);
        imageMode(CENTER);
        image(square1, width / 2 - 250 - volume, height / 2, height / 5, volume * 5);
        image(square2, width / 2 + 250 + volume, height / 2, height / 5, volume * 5);
        let myScreen = new RubyImage();
        myScreen.display();
    }
}

class RubyImage {
    constructor(temp_x, temp_y, temp_w, temp_h) {
        this.x = width / 2;
        this.y = height / 2 - 180;
        this.w = 330;
        this.h = 215;
    }
    display() {
        push();
        if (n_img == 0) {
            image(myLoad, this.x, this.y, this.w, this.h);
        } else if (n_img == 1) {
            image(imgUptownfunk, this.x, this.y, this.w, this.h);
        } else if (n_img == 2) {
            image(imgBangbang, this.x, this.y, this.w, this.h);
        } else if (n_img == 3) {
            image(imgAllstar, this.x, this.y, this.w, this.h);
        } else if (n_img == 4) {
            image(imgBohemianrapsody, this.x, this.y, this.w, this.h);
        } else if (n_img == 5) {
          image(imgTakeonme, this.x, this.y, this.w, this.h);
      }
        pop();
    }
}

function nextClicked() {
    n_img++;
    if (n_img == 6) {
        n_img = 1;
    }
    if (n_img == 1 && uptownFunk.isPlaying() == false) {
        startSong.stop();
        TakeOnMe.stop();
        uptownFunk.loop();
    } else if (n_img == 2 && bangBang.isPlaying() == false) {
	    uptownFunk.stop();
	    bangBang.loop();
    } else if (n_img == 3 && allStar.isPlaying() == false) {
        bangBang.stop();
	    allStar.loop();
    } else if (n_img == 4 && BohemianRapsody.isPlaying() == false) {
        allStar.stop();
	    BohemianRapsody.loop();
    }  else if (n_img == 5 && TakeOnMe.isPlaying() == false) {
      BohemianRapsody.stop();
    TakeOnMe.loop();
  }
}

function backClicked() {
    n_img--;
    if (n_img == 0 || n_img == -1) {
        n_img = 5;
    }
    if (n_img == 4 && BohemianRapsody.isPlaying() == false) {
        startSong.stop();
	    TakeOnMe.stop();
	    BohemianRapsody.loop();
    } else if (n_img == 3 && allStar.isPlaying() == false) {
        BohemianRapsody.stop();
        allStar.loop();
    } else if (n_img == 2 && bangBang.isPlaying() == false) {
        allStar.stop();
        bangBang.loop();
    } else if (n_img == 1 && uptownFunk.isPlaying() == false) {
        bangBang.stop();
	    uptownFunk.loop();
    } else if (n_img == 1 && TakeOnMe.isPlaying() == false) {
      uptownFunk.stop();
    TakeOnMe.loop();
  }
}

function playClicked() {
    if (n_img == 0) {
        n_img++;
        startSong.stop();
        uptownFunk.loop();
    }
    if (uptownFunk.isPaused()) {
        uptownFunk.loop();
    } else if (bangBang.isPaused()) {
        bangBang.loop();
    } else if (allStar.isPaused()) {
        allStar.loop();
    } else if (BohemianRapsody.isPaused()) {
        BohemianRapsody.loop();
    } else if (TakeOnMe.isPaused()) {
      TakeOnMe.loop();
  }
}

function pauseClicked() {
    background(0);
    allStar.pause();
    bangBang.pause();
    uptownFunk.pause();
    BohemianRapsody.pause();
    TakeOnMe.pause();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);

    let volume = 0;
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, 300);

    if (allStar.isPlaying() || uptownFunk.isPlaying() || BohemianRapsody.isPlaying() || bangBang.isPlaying() || TakeOnMe.isPlaying()) {
        imageMode(CORNER);
        image(myGirl, 0, 0, width/2, height);
        image(myGirl2, width / 2, 0, width / 2, height);
        imageMode(CENTER)
        image(square1, width / 2 - 200 - volume, height / 2, height / 5, volume * 5);
        image(square2, width / 2 + 200 + volume, height / 2, height / 5, volume * 5);
        let myScreen = new RubyImage();
        myScreen.display();
    }
    if (n_img == 0) {
        let myScreen = new RubyImage();
        myScreen.display();
    }
    imageMode(CENTER);

    // Button Play
    push();
    buttonplay.position(width / 2 + 118, height / 2 + 250);
    pop();
    // Button Pause
    push();
    buttonpause.position(width / 2 + 52, height / 2 + 250);
    pop();
    // Button Next
    push();
    buttonnext.position(width / 2 - 72, height / 2 + 250);
    pop();
    // Button Back
    push();
    buttonback.position(width / 2 - 155, height / 2 + 250);
    pop();
}
