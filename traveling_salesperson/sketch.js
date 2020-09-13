let cities = [];
const totalCities = 5;

let order = [];

let totalPermutations;
let count = 1;

let recordDistance;
let bestEver;

let statusP;

function setup() {
   createCanvas(600, 650);
   for (let i = 0; i < totalCities; i++) {
      const v = createVector(random(width), random(height / 2))
      cities[i] = v;
      order[i] = i;
   }

   const d = calcDistance(cities, order);
   recordDistance = d;
   bestEver = order.slice();

   totalPermutations = factorial(totalCities);

   statusP = createP().style('font-size', '48px');
}

function draw() {
   background(0);
   fill(255);
   cities.forEach(city => {
      ellipse(city.x, city.y, 8, 8);
   });

   stroke(255, 0, 255);
   strokeWeight(4);
   noFill();
   beginShape();
   for (let i = 0; i < order.length; i++) {
      const n = bestEver[i];
      const city = cities[n];
      vertex(city.x, city.y);
   }
   endShape();

   translate(0, height / 2);
   strokeWeight(1);
   stroke(255);
   noFill();
   beginShape();
   for (let i = 0; i < order.length; i++) {
      const n = order[i];
      const city = cities[n];
      vertex(city.x, city.y);
   }
   endShape();


   const d = calcDistance(cities, order);
   if (d < recordDistance) {
      recordDistance = d;
      bestEver = order.slice();
   }

   fill(255);
   textSize(32);

   const percent = 100 * (count / totalPermutations);
   // text(nf(percent, 0, 2) + '% completed', 1, height / 2 - 50);
   statusP.html(nf(percent, 0, 2) + '% completed');

   nextOrder();
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

      const d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
      sum += d;

   }
   return sum;
}

function nextOrder() {
   count++;

   let largestI = -1;
   for (let i = 0; i < order.length - 1; i++) {
      if (order[i] < order[i + 1]) {
         largestI = i;
      }
   }

   if (largestI == -1) {
      noLoop();
      console.log('finished');
   }

   let largestJ = -1;
   for (let j = 0; j < order.length; j++) {
      if (order[largestI] < order[j]) {
         largestJ = j;
      }
   }

   swap(order, largestI, largestJ);

   const endArray = order.splice(largestI + 1);
   endArray.reverse();
   order = order.concat(endArray);
}

function factorial(n) {
   if (n == 1) return n;
   else return n * factorial(n - 1);
}