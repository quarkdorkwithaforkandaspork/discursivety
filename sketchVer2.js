let prompt = "Write the name of something you love.";
let fav = "";
let charSize = 50;
let charMax = 60;
let charMin = 50;
let increasing = true;
var scalar = 50;  // set the radius of circle
var startX = 0;	// set the x-coordinate for the circle center
var startY = Math.floor(Math.random() * 20);;	// set the y-coordinate for the circle center
let things = [];
let textfield;
let enteredType;
let why = false;
let currentHue = 0;
let ambiance;

function preload() {
      soundFormats('ogg', 'mp3');
      ambiance = loadSound("https://quarkdorkwithaforkandaspork.github.io/discursivety/audio/meditation-music-322801.mp3")
    }

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-container');
  textfield = document.getElementById("textfield");
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  userStartAudio();
  ambiance.setVolume(0.25);
    if (ambiance.isLoaded()) {
    ambiance.loop();
  } else {
    ambiance.onLoad(() => {
      ambiance.loop();
    });
  }
    ambiance.play();
}

function draw() {
  background(currentHue, 100, 5);
  currentHue = (currentHue + 0.1) % 360;  
  translate(width/2, height/2);
  textFont('Courier New');
  fill('white');
  textSize(charSize);
  text(prompt, 0, -300);

  textSize(30);
  text(fav, 0 + ((mouseX - (width/2))/6), 0 + ((mouseY - (height/2))/6));

  if(increasing){
    charSize = charSize + 0.01;
    if(charSize >= charMax){
      charSize = charMax;
      increasing = false;
    }
  } else {
    charSize = charSize - 0.01;
    if(charSize <= charMin){
      console.log('decreasing');
      charSize = charMin;
      increasing = true;
    }
  }
  
  things.forEach((thing, index) => {
    circleMove(thing, index)
  });
  
}

function circleMove(textToMove, i) {
  var x = startX + (scalar + (i * 50)) * cos(textToMove.angle);
  var y = startY + (scalar + (i * 50)) * sin(textToMove.angle);
  
  stroke(50);
  drawingContext.setLineDash([5, 5]);
  line( 0 + ((mouseX - (width/2))/6), 0 + ((mouseY - (height/2))/6), x + ((mouseX - (width/2))/8), y + ((mouseY - (height/2))/8));


  textSize(15);
  text(textToMove.text, x + ((mouseX - (width/2))/8), y + ((mouseY - (height/2))/8));
  console.log(textToMove.text, x + ((mouseX - (width/2))/6), y + ((mouseY - (height/2))/6));
  
  textToMove.angle += textToMove.speed;
}

function keyPressed(){
   if (keyCode === ENTER) {
    if (why){
      enteredType = textfield.value.trim();
      if(enteredType !== ""){
        let i = things.length;
        let baseSpeed = 0.01;
        let indexedSpeed = baseSpeed / (i + 1);

        things.push({
          text: enteredType,
          angle: 0,
          speed: indexedSpeed
        });  
      }
    } else {
      prompt = "Why did you choose that?"
      fav = textfield.value.trim();
      why = true;
    }
    textfield.value = '';
    return false;
  }
}