const mr = .1;

class Vehicle {
   constructor(x, y, dna) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, -2);
      this.position = createVector(x, y);
      this.r = 4;
      this.maxspeed = 5;
      this.maxforce = 0.5;

      this.health = 1;

      this.dna = [];
      if (dna) {
         for (let i = 0; i < dna.length; i++) {
            this.dna[i] = dna[i];
         }
      }
      else {
         this.dna[0] = random(-2, 2);
         if (random(1) < mr) {
            this.dna[0] += random(-.1, .1);
         }
         this.dna[1] = random(-2, 2);
         if (random(1) < mr) {
            this.dna[1] += random(-.1, .1);
         }
         this.dna[2] = random(0, 150);
         if (random(1) < mr) {
            this.dna[0] += random(-10, 10);
         }
         this.dna[3] = random(0, 150);
         if (random(1) < mr) {
            this.dna[0] += random(-10, 10);
         }
      }
      // this.dna = [1, -.5];
   }

   // Method to update location
   update() {
      this.health -= .01;

      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelerationelertion to 0 each cycle
      this.acceleration.mult(0);
   }

   applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
   }

   boundaries() {
      const d = 25;
      let desired = null;

      if (this.position.x < d) {
         desired = createVector(this.maxspeed, this.velocity.y);
      } else if (this.position.x > width - d) {
         desired = createVector(-this.maxspeed, this.velocity.y);
      }

      if (this.position.y < d) {
         desired = createVector(this.velocity.x, this.maxspeed);
      } else if (this.position.y > height - d) {
         desired = createVector(this.velocity.x, -this.maxspeed);
      }

      if (desired !== null) {
         desired.normalize();
         desired.mult(this.maxspeed);
         let steer = p5.Vector.sub(desired, this.velocity);
         steer.limit(this.maxforce);
         this.applyForce(steer);
      }
   }

   behaviors(good, bad) {
      const steerG = this.eat(good, .3, this.dna[2]);
      const sterrB = this.eat(bad, -.75, this.dna[3]);

      steerG.mult(this.dna[0]);
      sterrB.mult(this.dna[1]);

      this.applyForce(steerG);
      this.applyForce(sterrB);
   }

   clone() {
      if (random(1) < .005)
         return new Vehicle(this.position.x, this.position.y, this.dna);
      else return null;
   }

   eat(list, nutrition, perception) {
      let record = Infinity;
      let closest = null;

      for (let i = list.length - 1; i >= 0; i--) {
         const d = this.position.dist(list[i]);

         if (d < this.maxspeed + 1) {
            list.splice(i, 1);
            this.health += nutrition;
         } else {
            if (d < record && d < perception) {
               record = d;
               closest = list[i];
            }
         }

      }

      if (closest != null)
         return this.seek(closest);

      return createVector(0, 0);
   }

   // A method that calculates a steering force towards a target
   // STEER = DESIRED MINUS VELOCITY
   seek(target) {
      var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

      // Scale to maximum speed
      desired.setMag(this.maxspeed);

      // Steering = Desired minus velocity
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force

      return steer;
   }

   dead() {
      return this.health < 0;
   }

   display() {
      // Draw a triangle rotated in the direction of velocity
      let angle = this.velocity.heading() + PI / 2;

      push();

      translate(this.position.x, this.position.y);
      rotate(angle);

      if (debug.checked()) {
         strokeWeight(3);
         stroke(0, 255, 0);
         noFill();
         ellipse(0, 0, this.dna[2]);
         line(0, 0, 0, -this.dna[0] * 20);
         strokeWeight(2);
         stroke(255, 0, 0);
         ellipse(0, 0, this.dna[3])
         line(0, 0, 0, -this.dna[1] * 20);
      }

      const gr = color(0, 255, 0);
      const rd = color(255, 0, 0);
      const col = lerpColor(rd, gr, this.health);

      fill(col);
      noStroke();
      strokeWeight(1);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);

      pop();
   }
}
