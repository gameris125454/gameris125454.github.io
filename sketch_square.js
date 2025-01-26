// size of each cell in the grid
const CELL_SIZE = 40;
const COLOR_R = 255;
const COLOR_G = 57;
const COLOR_B = 20;
const STARTING_ALPHA = 255;
const PROB_OF_NEIGHBOR = 0.5;
const BACKGROUND_COLOR = 31;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

// VARIABLES
let colorWithAIpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allNeighbors = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('position', 'fixed');
    cnv.style('inset', 0);
    cnv.style('z-index', -1);

    colorWithAIpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA)
    noFill();
    stroke(colorWithAIpha)
    strokeWeight(STROKE_WEIGHT)
    numRows = Math.ceil(windowHeight / CELL_SIZE)
    numCols = Math.ceil(windowWidth / CELL_SIZE)
}

function draw() {
    background(BACKGROUND_COLOR)

    let row = floor(mouseY / CELL_SIZE)
    let col = floor(mouseX / CELL_SIZE)

    // check mouse if moved to another cell
    if (row !== currentRow || col !== currentCol) {
        currentRow = row;
        currentCol = col; 

        let y = currentRow * CELL_SIZE;
        let x = currentCol * CELL_SIZE;

        rect(x, y, CELL_SIZE, CELL_SIZE);

        allNeighbors.push(...getRandomNeighbors(row, col));
    }

    let y = currentRow * CELL_SIZE;
    let x = currentCol * CELL_SIZE;

    stroke(colorWithAIpha);
    rect(x, y, CELL_SIZE, CELL_SIZE);

    for (let neighbor of allNeighbors) {
         let neighborX = neighbor.col * CELL_SIZE
         let neighborY = neighbor.row * CELL_SIZE
         // decrease the opacity  of the neightbord each frame
         neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
         stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
         rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
    }

    // remove neighbors with opacity ore than 0
    allNeighbors = allNeighbors.filter((neighbor) =>  neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
    let neighbors = []

    // loop cells
    for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
            let neighborRow = row + dRow;
            let neighborCol = col + dCol;

            let isCurrentCell = dRow === 0 && dCol ===0;

            let isInBounds = 
            neighborRow >= 0 &&
            neighborRow < numRows &&
            neighborCol >= 0 &&
            neighborCol < numCols;

            if (!isCurrentCell && isInBounds && random() < PROB_OF_NEIGHBOR) {
                neighbors.push({
                    row: neighborRow,
                    col: neighborCol,
                    opacity: STARTING_ALPHA
                })
            }
        }
    }

    return neighbors
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    numRows = Math.ceil(windowHeight / CELL_SIZE)
    numCols = Math.ceil(windowWidth / CELL_SIZE)
}