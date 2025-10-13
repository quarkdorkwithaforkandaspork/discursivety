const fadeSketch = (p) => {
  let opacity = 255;

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('fade-container');
    p.noStroke();
  };

  p.draw = function () {
    p.clear();

    p.fill(0, opacity);
    p.rect(0, 0, p.width, p.height);

    opacity -= 0.5;
    if (opacity <= 0) {
      p.noLoop();
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(fadeSketch);