var cols, rows;
let w = 20;
let grid = [];
let bt, next_bt;

var current;

var stack = [];

function setup() {
    var cnv = createCanvas(400, 400);
    // var x = (windowWidth - width) / 2;
    // var y = (windowHeight - height - 200) / 2;
    // cnv.position(x, y);

    bt = createButton('save Image');
    next_bt = createButton('next Page: 10PRINT');

    cols = floor(width / w);
    rows = floor(height / w);
    // frameRate(5);

    for (let j=0; j < rows; j++) {
        for (let i=0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

function saveImages() {
    save('the maze generator.png');
}

function sendToNext() {
    window.location.href = './10PRINT/';
}

function keyPressed() {
    if (key == 's') {
        saveGif('the maze DevLog gameris125454.gif', 15);
    }
}

function draw() {
    background(0,50,0);

    for (let i=0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;

        stack.push(current);

        removeWalls(current, next);

        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

    bt.mouseClicked(saveImages);
    next_bt.mouseClicked(sendToNext);
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }

    return i + j * cols;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.highlight = function() {
        var x = this.i*w;
        var y = this.j*w;
        noStroke();
        fill(255, 0, 0);
        rect(x, y, w, w);
    }

    this.checkNeighbors = function() {
        var Neigbors = [];

        var top =   grid[index(i    , j - 1)];
        var right = grid[index(i + 1, j    )];
        var down =  grid[index(i    , j + 1)];
        var left =  grid[index(i - 1, j    )];

        if (top && !top.visited) {
            Neigbors.push(top);
        }
        if (right && !right.visited) {
            Neigbors.push(right);
        }
        if (down && !down.visited) {
            Neigbors.push(down);
        }
        if (left && !left.visited) {
            Neigbors.push(left);
        }
        if (Neigbors.length > 0) {
            var r = floor(random(0, Neigbors.length));
            return Neigbors[r];
        } else {
            return undefined;
        }
    }

    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;

        stroke(0,255,0);
        strokeWeight(2);
        if (this.walls[0]) {
            line(x    , y    , x + w, y    );
        }
        if (this.walls[1]) {
            line(x + w, y    , x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x,     y + w);
        }
        if (this.walls[3]) {
            line(x    , y + w, x,     y    );
        }

        if (this.visited) {
            noStroke();
            fill(0, 150, 0);
            rect(x,y,w,w);
        }
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
