let prompt = "What's your favorite thing?";
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
let textXAlign = -(charSize * 6);

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-container');
  textfield = document.getElementById("textfield");
}

function draw() {
  clear();
  translate(width/2, height/2);
  textSize(charSize);
  text(prompt, textXAlign, -(charSize * 5));

  textSize(20);
  text(fav, 0, 0);

  if(increasing){
    charSize = charSize + 0.05;
    if(charSize >= charMax){
      charSize = charMax;
      increasing = false;
    }
  } else {
    charSize = charSize - 0.05;
    if(charSize <= charMin){
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
  
  textSize(15);
  text(textToMove.text, x, y);
  console.log(textToMove.text, x, y)
  
  textToMove.angle += textToMove.speed;
}

function keyPressed(){
   if (keyCode === ENTER) {
    if (why){
      enteredType = textfield.value.trim();
      if(enteredType !== ""){
        let i = things.length;
        let baseSpeed = 0.015;
        let indexedSpeed = baseSpeed / (i + 1);

        things.push({
          text: enteredType,
          angle: 0,
          speed: indexedSpeed + random(0.005, 0.01)
        });  
      }
    } else {
      prompt = "Why?"
      textXAlign = -50;
      fav = textfield.value.trim();
      why = true;
    }
    textfield.value = '';
    return false;
  }
}