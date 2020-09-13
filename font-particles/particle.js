function Particle(x, y, r) {
   this.r = r;
   this.seekLocation = createVector(x, y);
   this.location = createVector(random(width), random(height));
   this.velocity = p5.Vector.random2D();
   this.acceleration = createVector(0, 0);
   this.maxspeed = 10;
   this.maxforce = 1;

   this.show = function () {
      ellipse(this.location.x, this.location.y, r * 2);
   }

   this.applyForce = function (force) {
      this.acceleration.add(force);
   }

   this.update = function () {
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
   }

   this.applyBehaviors = function () {
      let seek = this.seek();
      let flee = this.flee();
      this.applyForce(seek);
      this.applyForce(flee.mult(5));
   }

   this.seek = function () {
      let d = p5.Vector.dist(this.location, this.seekLocation);
      let speed = map(d, 0, 100, 0, this.maxspeed);
      let desired = p5.Vector.sub(this.seekLocation, this.location);
      desired.setMag(speed);

      let steering = p5.Vector.sub(desired, this.velocity);
      steering.limit(this.maxforce);
      return steering;
   }

   this.flee = function () {
      let mouseVector = createVector(mouseX, mouseY);
      let desired = p5.Vector.sub(mouseVector, this.location);
      let d = desired.mag();
      if (d < 50) {
         desired.setMag(this.maxspeed);
         desired.mult(-1);
         let steering = p5.Vector.sub(desired, this.velocity);
         steering.limit(this.maxforce);
         return steering;
      } else return createVector();
   }
}