function setup() {
	rectanglesLayer = createGraphics(CANVAS.WIDTH, CANVAS.HEIGHT)
	rectanglesLayer.rectMode(CENTER)
	rectanglesLayer.angleMode(DEGREES)
	rectanglesLayer.noFill()

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

			// -sin(x+sin(x-pi)-pi)

			print(s)
			
			for (let index = 0; index < s; index++) {
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
	layer.quad(
		center.x-halfSize+noiseArray[0].x, center.y-halfSize+noiseArray[0].y,
		center.x+halfSize+noiseArray[1].x, center.y-halfSize+noiseArray[1].y,
		center.x+halfSize+noiseArray[2].x, center.y+halfSize+noiseArray[2].y,
		center.x-halfSize+noiseArray[3].x, center.y+halfSize+noiseArray[3].y
	)
}

