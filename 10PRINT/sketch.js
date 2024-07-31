let x = 0;
let y = 0;
let prob = 0.5;
let spacing = 20;
let generate = false;
let bt_start, bt_stop, slider, probValueText, back_bt;

function setup() {
    createCanvas(400, 400);
    background(0);

    bt_start = createButton('start');
    bt_stop = createButton('reset');
    

    slider = createSlider(0, 1, 0.5, 0.05);

    probValueText = createP('prob: 0.5');

    back_bt = createButton('back to maze generator');

    bt_start.mouseClicked(generatesketch);
    bt_stop.mouseClicked(reset);
    slider.input(changeProb);
    back_bt.mouseClicked(sendToNext)
}

function sendToNext() {
    window.location.href = '../../';
}

function keyPressed() {
    if (key == 's') {
        saveGif('the maze DevLog gameris125454.gif', 15);
    }
}

function changeProb() {
    prob = slider.value();
    text = toString(prob);
    probValueText.html('prob: ' + prob);
}

function generatesketch() {
    if (!generate) {
        generate = true;
    }
}

function reset() {
    generate = false;
    x = 0;
    y = 0;
    background(0);
}

function draw() {
    if (generate) {
            stroke(255);
        if (random(1) < prob) {
            line(x, y, x + spacing, y + spacing);
        }  else {
            line(x, y + spacing, x + spacing, y);
        }
        x += spacing;
        if (x > width) {
            x = 0;
            y += spacing;
        }
    }
}
