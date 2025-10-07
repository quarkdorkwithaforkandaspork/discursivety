let brushSize = 50;
let sslider;
let img;
let userImg;
let pg;

function preload() {
  img = loadImage('arty-idle.png'); // default image is a character i drew for a 48 hour game jam. super fun, great memories...
}

function setup() {
  let canvas = createCanvas(windowWidth - 50, windowHeight);
  canvas.parent('p5-container');
  pg = createGraphics(windowWidth - 50, windowHeight);
  sslider = document.getElementById("myRange");
  frameRate(120);
  background(0);
  noCursor();

  // needed some help from a friend in cs for this part. here's what I got from what he told me:
  const fileInput = document.getElementById("input"); // i alr had ts
  fileInput.addEventListener("change", function(event) { //listen to the input for a change and call a function
      const file = event.target.files[0]; //from mozilla, gets the first (and only, in our case) file from the input field
      const imgURL = URL.createObjectURL(file); //had to create a url since the browser doesn't have access to local file paths for security reasons or smn
      loadImage(imgURL, loadedImg => {userImg = loadedImg;}); //load the image as the brush from the url, then run an 'arrow function' to set userimg as the newly loaded image
  });
}

function draw() {
  clear();
  brushSize = parseInt(sslider.value);
  image(pg, 0, 0);

  let brush = userImg || img;
  if (brush) {
    image(brush, mouseX - brushSize / 2, mouseY - brushSize / 2, brushSize, brushSize);
  }

  noFill();
  stroke(0);
}

function mouseDragged() {
  let brush = userImg || img;
  if (brush) {
    pg.image(brush, mouseX - brushSize / 2, mouseY - brushSize / 2, brushSize, brushSize);
  }
}
