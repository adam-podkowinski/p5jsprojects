class Spot {
   constructor(i, j) {
      this.i = i;
      this.j = j;
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.neighbors = [];
      this.previous = undefined;
      this.wall = false;
      if (random(1) < .3) this.wall = true;
   }

   show(col) {
      fill(col);
      if (this.wall) {
         fill(0);
         noStroke();
         ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
      }
   }

   addNeighbors(grid) {
      const i = this.i;
      const j = this.j;
      if (i < cols - 1)
         this.neighbors.push(grid[i + 1][j]);
      if (i > 0)
         this.neighbors.push(grid[i - 1][j]);
      if (j < rows - 1)
         this.neighbors.push(grid[i][j + 1]);
      if (j > 0)
         this.neighbors.push(grid[i][j - 1]);
      if (i > 0 && j > 0)
         this.neighbors.push(grid[i - 1][j - 1]);
      if (i > cols - 1 && j > 0)
         this.neighbors.push(grid[i + 1][j - 1]);
      if (i > 0 && j < rows - 1)
         this.neighbors.push(grid[i - 1][j + 1]);
      if (i < cols - 1 && j < rows - 1)
         this.neighbors.push(grid[i + 1][j + 1]);
   }
}