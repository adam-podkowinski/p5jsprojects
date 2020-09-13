function Rocket(dna) {
   this.pos = createVector(width / 2, height - 16);
   this.vel = createVector();
   this.acc = createVector();
   if (dna) this.dna = dna;
   else this.dna = new DNA();
   this.fitness = 0;

   this.timeToComplete = 0;

   this.completed = false;
   this.crashed = false;

   this.applyForce = function (force) {
      this.acc.add(force);
   }

   this.calcFitness = function () {
      const d = dist(this.pos.x, this.pos.y, target.x, target.y);
      let f = map(d, 0, width, max(width, height), 0) / this.timeToComplete;

      f = pow(f, 4);

      this.fitness = f;

      if (this.completed)
         this.fitness *= 10;

      if (this.crashed)
         this.fitness /= 5;

      if (this.fitness > maxFitness) {
         maxFitness = this.fitness;
      };
   }

   this.update = function () {
      const d = dist(this.pos.x, this.pos.y, target.x, target.y);
      if (d < 10)
         this.completed = true;

      if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh)
         this.crashed = true;

      if (this.pos.x > width || this.pos.x < 0)
         this.crashed = true;
      if (this.pos.y > height || this.pos.y < 0)
         this.crashed = true;

      if (this.crashed)
         this.timeToComplete += 1;

      if (!this.completed && !this.crashed) {
         this.timeToComplete += 1;
         this.applyForce(this.dna.genes[count]);
         this.vel.add(this.acc);
         this.pos.add(this.vel);
         this.acc.mult(0);
         this.vel.limit(5);
      }
   }

   this.show = function () {
      push();
      noStroke();
      fill(255, 150);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 30, 7);
      pop();
   }
}