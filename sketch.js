function setup() {
	rectanglesLayer = createGraphics(CANVAS.WIDTH, CANVAS.HEIGHT)
	rectanglesLayer.rectMode(CENTER)
	rectanglesLayer.angleMode(DEGREES)
	rectanglesLayer.noFill()

	COLORS = [
		color(34, 116, 165),
		color(221, 133, 44),
		"black"
	]
	COLORS_W = [
		33,
		33,
		33
	]

	noLoop()
}

function draw() {
	createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT)
	background(BACKGROUND_COLOR)

	topLeft = createVector(CANVAS.MARGINS_POSITION.LEFT+SQUARE_SIZE/2, CANVAS.MARGINS_POSITION.TOP+SQUARE_SIZE/2)
	positionsGrid = Grid2D.fromOnePoint(topLeft, N_SQUARES_V, N_SQUARES_H, SQUARE_SIZE, SQUARE_SIZE)

	for (let vIndex = 0; vIndex < positionsGrid.points.length; vIndex++) {
		const hpoints = positionsGrid.points[vIndex]

		for (let hIndex = 0; hIndex < hpoints.length; hIndex++) {
			const position = hpoints[hIndex]

			span = map(hIndex, 0, hpoints.length, 0, PI)
			// s = -5*sin(span+sin(span-PI)-PI)
			s = 5*sin(span)+1
			// s = 1

			// -sin(x+sin(x-pi)-pi)
			
			for (let index = 0; index < s; index++) {
				color = randomWeighted(COLORS, COLORS_W)
				rectanglesLayer.stroke(color)
				drawNoisyQuad(rectanglesLayer, position, SQUARE_SIZE, 0.5)
			}
		}
	}

	image(rectanglesLayer, 0, 0)

	// positionsGrid.debug()changechange
}

function drawNoisyQuad(layer, center, size, damping=1) {
	q = QuadStructure.noisy(center, size, 0.1, 0.1)
	q.render(layer)
}

class QuadStructure{
	constructor(points) {
		this.points = points // [topLeft, topRight, bottomRight, bottomLeft]
	}

	static regular(center, size) {
		let relativePostions = [createVector(-size/2, -size/2), createVector(size/2, -size/2), createVector(size/2, size/2), createVector(-size/2, size/2)]
		let points = []

		for (let index = 0; index < relativePostions.length; index++) {
			const point = p5.Vector.add(center, relativePostions[index])
			points.push(point)
		}
		
		return new QuadStructure(points)
	}

	static noisy(center, size, vertexNoiseRatio=0.5, translationNoiseRatio=1) {
		let translationMagnitude = random(translationNoiseRatio) * size
		let translatedCenter = center.add(p5.Vector.random2D().mult(translationMagnitude))

		quad = QuadStructure.regular(translatedCenter, size)

		for (let index = 0; index < 4; index++) {
			let noiseMagnitude = random(vertexNoiseRatio) * size
			quad.points[index].add(p5.Vector.random2D().mult(noiseMagnitude))
		}

		return quad
	}

	render(layer) {
		layer.quad(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y,
			this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y)
	}
}