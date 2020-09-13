let cities = [];
const totalCities = 12;

const populationSize = 3000;
let population = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;

let statusP;

function setup() {
   createCanvas(800, 800);
   let order = [];
   for (let i = 0; i < totalCities; i++) {
      const v = createVector(random(width), random(height / 2))
      cities[i] = v;
      order[i] = i;
   }

   for (let i = 0; i < populationSize; i++) {
      population[i] = shuffle(order);
   }
}

function draw() {
   background(0);

   //GA
   calculateFitness();
   normalizeFitness();
   nextGeneration();

   stroke(255);
   strokeWeight(4);
   noFill();
   beginShape();
   for (var i = 0; i < bestEver.length; i++) {
      var n = bestEver[i];
      vertex(cities[n].x, cities[n].y);
      ellipse(cities[n].x, cities[n].y, 16, 16);
   }
   endShape();

   translate(0, height / 2);
   stroke(255);
   strokeWeight(4);
   noFill();
   beginShape();
   for (var i = 0; i < currentBest.length; i++) {
      var n = currentBest[i];
      vertex(cities[n].x, cities[n].y);
      ellipse(cities[n].x, cities[n].y, 16, 16);
   }
   endShape();
}

function swap(a, i, j) {
   const temp = a[i];
   a[i] = a[j];
   a[j] = temp;
}

function calcDistance(points, order) {
   let sum = 0;
   for (let i = 0; i < order.length - 1; i++) {
      const cityAIndex = order[i];
      const cityA = points[cityAIndex];
      const cityBIndex = order[i + 1];
      const cityB = points[cityBIndex];
      // print(cityB);

      const d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
      sum += d;

   }
   return sum;
}