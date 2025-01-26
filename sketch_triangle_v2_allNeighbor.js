// CONSTANTS
const TRI_BASE = 40;
const TRI_HEIGHT = Math.sqrt(3) / 2 * TRI_BASE; 
const COLOR_R = 57;
const COLOR_G = 255;
const COLOR_B = 20;
const STARTING_ALPHA = 255;
const PROB_OF_NEIGHBOR = 1;
const BACKGROUND_COLOR = 31;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

// VARIABLES
let colorWithAlpha;
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

    colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
    noFill();
    stroke(colorWithAlpha);
    strokeWeight(STROKE_WEIGHT);

    // Calculate rows and columns
    numRows = Math.ceil(windowHeight / TRI_HEIGHT);
    numCols = Math.ceil(windowWidth / TRI_BASE) * 2; // Triangles alternate positions
}

function draw() {
    background(BACKGROUND_COLOR);

    let row = floor(mouseY / TRI_HEIGHT);
    let col = floor(mouseX / (TRI_BASE / 2));

    // Check if the mouse moved to another triangle
    if (row !== currentRow || col !== currentCol) {
        currentRow = row;
        currentCol = col;

        allNeighbors.push(...getRandomNeighbors(row, col));
    }

    // Draw the current triangle
    drawTriangle(currentRow, currentCol, STARTING_ALPHA);

    // Draw neighbors and fade them
    for (let neighbor of allNeighbors) {
        neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
        drawTriangle(neighbor.row, neighbor.col, neighbor.opacity);
    }

    // Remove neighbors with opacity 0
    allNeighbors = allNeighbors.filter(neighbor => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
    let neighbors = [];
    let isUpward = (row + col) % 2 === 0;

    // Define possible neighbors based on orientation
    let deltas = isUpward
        ? [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, 0], [1, -1]]
        : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

    for (let [dRow, dCol] of deltas) {
        let neighborRow = row + dRow;
        let neighborCol = col + dCol;

        if (
            neighborRow >= 0 &&
            neighborRow < numRows &&
            neighborCol >= 0 &&
            neighborCol < numCols &&
            random() < PROB_OF_NEIGHBOR
        ) {
            neighbors.push({
                row: neighborRow,
                col: neighborCol,
                opacity: STARTING_ALPHA,
            });
        }
    }

    return neighbors;
}

function drawTriangle(row, col, alpha) {
    let isUpward = (row + col) % 2 === 0;

    // Calculate x and y position of the triangle
    let x = col * (TRI_BASE / 2);
    let y = row * TRI_HEIGHT;

    let x1, y1, x2, y2, x3, y3;

    if (isUpward) {
        // Upward triangle
        x1 = x;
        y1 = y + TRI_HEIGHT;
        x2 = x + TRI_BASE / 2;
        y2 = y;
        x3 = x + TRI_BASE;
        y3 = y + TRI_HEIGHT;
    } else {
        // Downward triangle
        x1 = x;
        y1 = y;
        x2 = x + TRI_BASE / 2;
        y2 = y + TRI_HEIGHT;
        x3 = x + TRI_BASE;
        y3 = y;
    }

    stroke(COLOR_R, COLOR_G, COLOR_B, alpha);
    triangle(x1, y1, x2, y2, x3, y3);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    numRows = Math.ceil(windowHeight / TRI_HEIGHT);
    numCols = Math.ceil(windowWidth / TRI_BASE) * 2;
}
