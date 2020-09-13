function removeFromArray(arr, elt) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) arr.splice(i, 1);
	}
}

function heuristic(a, b) {
	const d = dist(a.i, a.j, b.i, b.j);
	// const d = abs(a.i - b.i) + abs(a.j - b.j);
	return d;
}

const cols = 50;
const rows = 50;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let path = [];

function setup() {
	createCanvas(900, 900);

	w = width / cols;
	h = height / rows;

	for (let i = 0; i < grid.length; i++) {
		grid[i] = new Array(rows);
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall = false;

	openSet.push(start);
}

function draw() {
	if (openSet.length > 0) {
		let winner = 0;
		for (let i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) winner = i;
		}

		const current = openSet[winner];

		if (current === end) {
			noLoop();
			console.log('done');
		}

		removeFromArray(openSet, current);
		closedSet.push(current);

		const neighbors = current.neighbors;

		for (let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];
			let newPath = false;
			if (!closedSet.includes(neighbor) && !neighbor.wall) {
				const tentG = current.g + 1;
				if (openSet.includes(neighbor)) {
					if (tentG < neighbor.g) {
						neighbor.g = tentG;
						print('1');
						newPath = true;
					}
				} else {
					neighbor.g = tentG;
					newPath = true;
					openSet.push(neighbor);
				}
				if (newPath) {
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}
			}
		}

		path = [];
		let temp = current;
		path.push(temp);
		while (temp.previous) {
			path.push(temp.previous);
			temp = temp.previous;
		}
	} else {
		// finish
		console.log('No solution');
		return;
	}

	background(255);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show(255);
		}
	}

	for (let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0));
	}
	for (let i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0));
	}

	noFill();
	stroke(255, 0, 255);
	strokeWeight(w / 2);
	beginShape();
	path.forEach((p) => {
		vertex(p.i * w + w / 2, p.j * h + h / 2);
	});
	endShape();
}
