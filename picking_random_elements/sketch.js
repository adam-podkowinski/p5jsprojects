let fruits = [
  { name: 'mango', score: 5 },
  { name: 'blueberry', score: 3 },
  { name: 'cherry', score: 1 },
  { name: 'apple', score: 1 },
  { name: 'melon', score: 7 }
];

function setup() {
  createCanvas(500, 500);
  background(0);

  let sum = 0;

  fruits.forEach((f) => { sum += f.score });

  fruits.forEach((f) => {
    f.prob = f.score / sum;
    f.count = 0;
  });

  for (let i = 0; i < 1000000; i++) {
    let fruit = pickOne(fruits);
    fruit.count++;
  }

  fruits.forEach((f) => { console.log(f.count / 1000000); });

}

function pickOne(list) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r -= list[index].prob;
    index++;
  }
  index--;

  return list[index];
}