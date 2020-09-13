let points = [];
let font;
let particles = [];

function preload() {
	font = loadFont('fonts/Roboto-Regular.ttf');
}

function setup() {
	textSize(99);
	createCanvas(1200, 900);
	points = font.textToPoints('Hallo Ich Bin Adam', 90, height / 2, 100);

	points.forEach((pt) => {
		particles.push(new Particle(pt.x, pt.y, 4));
	});
}

function draw() {
	background(51);
	particles.forEach((particle) => {
		particle.applyBehaviors();
		particle.update();
		particle.show();
	});
}
