const Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine;
let world;
let circles = [];
let boundaries = [];

function setup() {
  createCanvas(600, 600);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  boundaries.push(new Boundary(150, 100, width * .6, 20, .3));
  boundaries.push(new Boundary(350, 300, width * .8, 20, -.3));
  boundaries.push(new Boundary(150, 500, width * .6, 20, .3));
  boundaries.push(new Boundary(width / 2, height - 10, width, 20, 0));
}

// function mouseDragged() {
//   circles.push(new Circle(mouseX, mouseY, random(5, 20)));
// }

// function mousePressed() {
//   circles.push(new Circle(mouseX, mouseY, random(5, 20)));
// }

function draw() {
  background(51);

  circles.push(new Circle(width / 2, 50, random(5, 20)));


  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    if (circles[i].isOffScreen()) {
      circles[i].removeFromWorld();
      circles.splice(i, 1);
      i--;
    }
  }

  boundaries.forEach((boundary) => boundary.show());
}