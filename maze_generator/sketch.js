let cols, rows;
const w = 10;
let grid = [];
let current;
let stack = [];

function setup() {
   createCanvas(800, 700);
   cols = floor(width / w);
   rows = floor(height / w);

   for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
         const cell = new Cell(i, j);
         grid.push(cell);
      }
   }

   current = grid[0];
}

function draw() {
   background(50);

   for (let i = 0; i < grid.length; i++) {
      grid[i].show();
   }

   current.visited = true;
   current.highlight();

   const next = current.checkNeighbors();
   if (next) {
      next.visited = true;

      stack.push(current);

      removeWalls(current, next);
      current = next;
   } else if (stack.length > 0) {
      current = stack.pop();
   }
}

function removeWalls(a, b) {
   const x = a.i - b.i;
   if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
   } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
   }

   const y = a.j - b.j;
   if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
   } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
   }
}