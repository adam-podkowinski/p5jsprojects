let tree;

function setup() {
   createCanvas(800, 600);
   background(51);
   tree = new Tree();
   for (let i = 0; i < 100; i++) {
      tree.addValue(floor(random(0, 100)));
   }

   tree.traverse();
   const result = tree.search(10);
   if (!result) console.log('not found');
   else console.log(result);
}