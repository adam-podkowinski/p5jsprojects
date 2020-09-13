function calculateFitness() {
   let currentRecord = Infinity;
   for (let i = 0; i < population.length; i++) {
      const d = calcDistance(cities, population[i]);
      if (d < recordDistance) {
         recordDistance = d;
         bestEver = population[i];
      }
      if (d < currentRecord) {
         currentRecord = d;
         currentBest = population[i];
      }
      fitness[i] = 1 / (d + 1);
   }
}

function normalizeFitness() {
   let sum = 0;
   for (let i = 0; i < fitness.length; i++) {
      sum += fitness[i];
   }

   for (let i = 0; i < fitness.length; i++) {
      fitness[i] = fitness[i] / sum;
   }
}

function nextGeneration() {
   let newPopulation = [];
   for (let i = 0; i < population.length; i++) {
      const orderA = pickOne(population, fitness);
      const orderB = pickOne(population, fitness);
      const order = crossover(orderA, orderB);
      mutate(order, 0.01);
      newPopulation[i] = order;
   }
   population = newPopulation;
}

function pickOne(list, prob) {
   let index = 0;
   let r = random(1);

   while (r > 0) {
      r = r - prob[index];
      index++;
   }
   index--;
   return list[index].slice();
}

function crossover(orderA, orderB) {
   const start = floor(random(orderA.length));
   const end = floor(random(start + 1, orderA.length));
   const neworder = orderA.slice(start, end);

   const left = totalCities - neworder.length;
   for (let i = 0; i < orderB.length; i++) {
      const city = orderB[i];
      if (!neworder.includes(city)) {
         neworder.push(city);
      }
   }
   return neworder;
}

function mutate(order, mutationRate) {
   for (let i = 0; i < totalCities; i++) {
      if (random(1) < mutationRate) {
         const indexA = floor(random(order.length));
         let indexB = (indexA + 1) % totalCities;
         swap(order, indexA, indexB);
      }
   }
}
