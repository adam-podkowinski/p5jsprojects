let population;
let lifespan = 400;
let lifeP;
let count = 0;
let target;
let maxFitness = 0;
const maxforce = .5;

let rx;
let ry;
let rw;
let rh;

function setup() {
  createCanvas(800, 600);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);
  rx = width / 2 - width / 4;
  ry = height / 2 - 8;
  rw = width / 2;
  rh = 16;
}

function draw() {
  background(0);
  population.run();
  count++;
  if (count >= lifespan) {
    count = 0;
    population.evaluate();
  }

  population.show();

  lifeP.html(count);

  fill(255);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 20, 20);
}