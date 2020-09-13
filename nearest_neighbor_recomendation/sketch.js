let data;
let users;

let resultP;
let resultDivs = [];

function preload() {
   data = loadJSON('movies.json');
}

function setup() {
   noCanvas();
   users = {};

   let dropdowns = [];

   const titles = data.titles;
   for (title of titles) {
      const div = createDiv(title);
      const dropdown = createSelect();
      dropdown.title = title;
      dropdown.option('Not seen');
      dropdown.parent(div);
      dropdowns.push(dropdown);
      for (let star = 1; star < 6; star++) {
         dropdown.option(star);
      }
   }

   const button = createButton('Submit');
   button.mousePressed(predictRatings);
   resultP = createP();

   function predictRatings() {
      let newUser = {};
      for (dropdown of dropdowns) {
         const title = dropdown.title;
         let rating = dropdown.value();
         if (rating == 'Not seen') rating = null;
         newUser[title] = rating;
      }
      findNearestNeighbors(newUser);
   }

   function findNearestNeighbors(user) {
      for (let i = 0; i < resultDivs.length; i++) {
         resultDivs[i].remove();
      }
      resultDivs = [];

      let similarityScores = {};
      for (let i = 0; i < data.users.length; i++) {
         const other = data.users[i];
         const similarity = euclideanDistance(user, other);
         similarityScores[other.name] = similarity;
      }

      data.users.sort(compareSimilarity);

      function compareSimilarity(a, b) {
         const score1 = similarityScores[a.name];
         const score2 = similarityScores[b.name];
         return score2 - score1;
      }

      for (title of data.titles) {
         if (user[title] == null) {
            const k = 5;
            let weightedSum = 0;
            let similaritySum = 0;
            for (let i = 0; i < k; i++) {
               const name = data.users[i].name;
               const sim = similarityScores[name];
               const ratings = data.users[k];
               const rating = ratings[title];
               if (rating != null) {
                  weightedSum += rating * sim;
                  similaritySum += sim;
               }
            }

            const stars = nf(weightedSum / similaritySum, 1, 2);
            const div = createDiv(title + ': ' + stars);
            resultDivs.push(div);
            div.parent(resultP);
         }
      }


   }

}

function euclideanDistance(ratings1, ratings2) {

   const titles = data.titles;

   let sumSquares = 0;
   for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const rating1 = ratings1[title];
      const rating2 = ratings2[title];
      if (rating1 != null && rating2 != null) {
         const diff = rating1 - rating2;
         sumSquares += diff * diff;
      }
   }
   const d = sqrt(sumSquares);

   const similarity = 1 / (1 + d);
   return similarity;
}
