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
	halfSize = size/2
	noiseArray = []
	for (let index = 0; index < 4; index++) {
		translationMagnitude = random(MAX_TRANSLATION) * damping
		noiseArray.push(p5.Vector.random2D().mult(translationMagnitude))
	}
	q = QuadStructure.regular(center, size)
	// 	center.x-halfSize+noiseArray[0].x, center.y-halfSize+noiseArray[0].y,
	// 	center.x+halfSize+noiseArray[1].x, center.y-halfSize+noiseArray[1].y,
	// 	center.x+halfSize+noiseArray[2].x, center.y+halfSize+noiseArray[2].y,
	// 	center.x-halfSize+noiseArray[3].x, center.y+halfSize+noiseArray[3].y)
	q.render(layer)
}

class QuadStructure{
	constructor(topLeft, topRight, bottomRight, bottomLeft) {
		this.topLeft = topLeft
		this.topRight = topRight
		this.bottomRight = bottomRight
		this.bottomLeft = bottomLeft
	}

	static regular(center, size) {
		let topLeft = p5.Vector.add(
			center,
			createVector(-size/2, -size/2)
		)
		let topRight = p5.Vector.add(
			center,
			createVector(size/2, -size/2)
		)
		let bottomRight = p5.Vector.add(
			center,
			createVector(size/2, size/2)
		)
		let bottomLeft = p5.Vector.add(
			center,
			createVector(-size/2, size/2)
		)
		
		return new QuadStructure(topLeft, topRight, bottomRight, bottomLeft)
	}

	render(layer) {
		layer.quad(this.topLeft.x, this.topLeft.y, this.topRight.x, this.topRight.y,
			this.bottomRight.x, this.bottomRight.y, this.bottomLeft.x, this.bottomLeft.y)
	}
}