function Population() {
   this.rockets = [];
   this.popsize = 500;

   for (let i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
   }

   this.evaluate = function () {
      this.rockets.forEach((rocket) => {
         rocket.calcFitness();
      });
      this.selection();

      console.log(maxFitness);
   }

   this.selection = function () {
      let newRockets = [];
      for (let i = 0; i < this.rockets.length; i++) {
         const parentA = this.pickOne().dna;
         const parentB = this.pickOne().dna;
         const child = parentA.crossover(parentB);
         child.mutation();
         newRockets[i] = new Rocket(child);
      }
      this.rockets = newRockets;
   }

   this.run = function () {
      this.rockets.forEach((rocket) => {
         rocket.update();
      });
   }

   this.show = function () {
      this.rockets.forEach((rocket) => {
         rocket.show();
      });
   }

   this.pickOne = function () {
      let sum = 0;
      this.rockets.forEach((r) => { sum += r.fitness });

      let index = 0;
      let r = random(sum);

      while (r > 0) {
         r -= this.rockets[index].fitness;
         index++;
      }
      index--;

      return this.rockets[index];
   }
}