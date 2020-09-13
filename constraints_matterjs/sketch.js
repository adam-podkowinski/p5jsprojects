const Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let particles = [];
let boundaries = [];

let mConstraint;

function setup() {
  const canvas = createCanvas(600, 600);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  let previous = null;

  for (let x = width / 2; x < width; x += 20) {
    let fixed = false;
    if (!previous) fixed = true;
    const p = new Particle(x, 100, 10, fixed);
    particles.push(p);

    if (previous) {
      const options = {
        bodyA: p.body,
        bodyB: previous.body,
        length: 20,
        stiffness: .5
      }

      const constraint = Constraint.create(options);
      World.add(world, constraint);
    }
    previous = p;
  }

  boundaries.push(new Boundary(width / 2, height + 30, width, 100, 0));
  // boundaries.push(new Boundary(10, height / 2, height, 20, PI / 2));
  // boundaries.push(new Boundary(width - 10, height / 2, height, 20, PI / 2));

  let canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();

  const options = {
    mouse: canvasMouse
  }

  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

// function mouseDragged() {
//   particles.push(new Particle(mouseX, mouseY, random(5, 20)));
// }

// function mousePressed() {
//   particles.push(new Particle(mouseX, mouseY, random(5, 20)));
// }

function draw() {
  background(51);

  boundaries.forEach((boundary) => boundary.show());

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      particles[i].removeFromWorld();
      particles.splice(i, 1);
      i--;
    }
  }

  // line(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);

  if (mConstraint.body) {
    let pos = mConstraint.body.position;
    let offset = mConstraint.constraint.pointB;
    let m = mConstraint.mouse.position;

    stroke(0, 255, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}