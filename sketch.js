function setup() {
	rectanglesLayer = createGraphics(CANVAS.WIDTH, CANVAS.HEIGHT)
	rectanglesLayer.rectMode(CENTER)
	rectanglesLayer.angleMode(DEGREES)
	rectanglesLayer.noFill()

	noLoop()

	N_SQUARES_MAX = linspace(0, 20, 20, false)
	N_SQUARES_WEIGHTS = Array(20).fill(1)

	N_SQUARES_WEIGHTS[0] = 1 // no
	N_SQUARES_WEIGHTS.fill(2, 1, 6) // low
	N_SQUARES_WEIGHTS.fill(1, 6, 11) // med
	N_SQUARES_WEIGHTS.fill(2, 11, 16) // high
	N_SQUARES_WEIGHTS.fill(1, 16, 20) // very high
}

function draw() {
	createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT)
	background(BACKGROUND_COLOR)
	rectanglesLayer.background(BACKGROUND_COLOR)

	topLeft = createVector(CANVAS.MARGINS_POSITION.LEFT+SQUARE_STEP/2, CANVAS.MARGINS_POSITION.TOP+SQUARE_STEP/2)
	positionsGrid = Grid2D.fromOnePoint(topLeft, N_SQUARES_V, N_SQUARES_H, SQUARE_STEP, SQUARE_STEP)

	for (let vIndex = 0; vIndex < positionsGrid.points.length; vIndex++) {
		const hpoints = positionsGrid.points[vIndex]

		for (let hIndex = 0; hIndex < hpoints.length; hIndex++) {
			const position = hpoints[hIndex]

			s = randomWeighted(N_SQUARES_MAX, N_SQUARES_WEIGHTS)
			
			for (let index = 0; index < s; index++) {
				q = QuadStructure.noisy(position, SQUARE_SIZE, 0.125, 0.05)
				q.render(rectanglesLayer)
			}
		}
	}
	image(rectanglesLayer, 0, 0)
}
