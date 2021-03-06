const data = [];

let m = 1;
let b = 0;

function setup() {
   createCanvas(500, 500);
}

function linearRegression() {
   let xsum = 0;
   let ysum = 0;
   data.forEach(pt => {
      xsum += pt.x;
      ysum += pt.y;
   });

   const ymean = ysum / data.length;
   const xmean = xsum / data.length;

   let num = 0;
   let den = 0;
   data.forEach(pt => {
      const x = pt.x;
      const y = pt.y;
      num += (x - xmean) * (y - ymean);
      den += (x - xmean) * (x - xmean);
   });

   m = num / den;
   b = ymean - m * xmean;
}

function drawLine() {
   let x1 = 0;
   let x2 = 1;
   let y1 = m * x1 + b;
   let y2 = m * x2 + b;


   x1 = map(x1, 0, 1, 0, width);
   x2 = map(x2, 0, 1, 0, width);
   y1 = map(y1, 0, 1, height, 0);
   y2 = map(y2, 0, 1, height, 0);

   stroke(255, 0, 255);
   line(x1, y1, x2, y2);
}

function mousePressed() {
   const x = map(mouseX, 0, width, 0, 1);
   const y = map(mouseY, 0, height, 1, 0);

   const pt = createVector(x, y);
   data.push(pt);
}

function draw() {
   background(51);

   data.forEach(pt => {
      const x = map(pt.x, 0, 1, 0, width);
      const y = map(pt.y, 0, 1, height, 0);
      fill(255);
      stroke(255);
      ellipse(x, y, 8, 8);
   });

   if (data.length > 1) {
      linearRegression();
      drawLine();
   }
}