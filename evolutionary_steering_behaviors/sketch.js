let vehicles = [];
let food = [];
let poison = [];

let debug;

function setup() {
  console.log("lol1ol"); 
  createCanvas(640, 360);
   for (let i = 0; i < 50; i++) {
      const x = random(width);
      const y = random(height);
      vehicles[i] = new Vehicle(x, y);
   }
   for (let i = 0; i < 50; i++) {
      const x = random(width);
      const y = random(height);
      food.push(createVector(x, y));
   }
   for (let i = 0; i < 20; i++) {
      const x = random(width);
      const y = random(height);
      poison.push(createVector(x, y));
   }

   debug = createCheckbox();
}
function mouseDragged() {
   vehicles.push(new Vehicle(mouseX, mouseY));
}
function draw() {
   background(51);

   if (random(1) < .1) {
      const x = random(width);
      const y = random(height);
      food.push(createVector(x, y));
   }

   if (random(1) < .025) {
      const x = random(width);
      const y = random(height);
      poison.push(createVector(x, y));
   }

   food.forEach(f => {
      fill(0, 255, 0);
      noStroke();
      ellipse(f.x, f.y, 4, 4);
   });
   poison.forEach(p => {
      fill(255, 0, 0);
      noStroke();
      ellipse(p.x, p.y, 4, 4);
   });

   for (let i = vehicles.length - 1; i >= 0; i--) {
      vehicles[i].boundaries();
      vehicles[i].behaviors(food, poison);
      vehicles[i].update();
      vehicles[i].display();

      const newVehicle = vehicles[i].clone();
      if (newVehicle) vehicles.push(newVehicle);

      if (vehicles[i].dead()) {
         const x = vehicles[i].x;
         const y = vehicles[i].y;
         food.push(createVector(x, y));

         vehicles.splice(i, 1);
      }
   }
}
