const grid = document.querySelector(".grid");
const gridBlock = document.querySelectorAll(".grid div");
const squares = Array.from(gridBlock);
const width = 10;

const iTetromino = [
    [1, width + 1, width*2 + 1, width*3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width*2 + 1, width*3 + 1],
    [width, width + 1, width + 2, width + 3]
];
const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
];
const tTetromino = [
    [width, width + 1, width + 2, 1],
    [1, width + 1, width*2 + 1, width + 2],
    [width, width + 1, width + 2, width*2 + 1],
    [1, width + 1, width*2 + 1, width]
];
const lTetromino = [
    [1, width + 1, width*2+1, 2],
    [width, width + 1, width + 2, width*2 + 2],
    [width*2, 1, width + 1, width*2 + 1],
    [width, width*2, width*2 + 1, width*2 + 2]
];
const zTetromino = [
    [width, width + 1, 1, 2],
    [0, width, width + 1, width*2 + 1],
    [width, width + 1, 1, 2],
    [0, width, width + 1, width*2 + 1],
];
const theTetrominoes = [iTetromino, oTetromino, tTetromino, lTetromino, zTetromino];

var preRan = 0;
function randomTetro() {
    random = Math.floor(Math.random()*theTetrominoes.length);
    while (random == preRan) {
        random = Math.floor(Math.random()*theTetrominoes.length);
    }
    preRan = random;
    return theTetrominoes[random];
};
function draw(tetro) {
    tetro.forEach(index => squares[currentPosition + index].classList.add("tetro"));
};
function unDraw(tetro) {
    tetro.forEach(index => squares[currentPosition + index].classList.remove("tetro"));
};
function freeze(tetro) {
    if (tetro.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        tetro.forEach(index => squares[currentPosition + index - width].classList.add("taken"));
        currentTetro = randomTetro()[currentRotation];
        currentPosition = 3;
        draw(currentTetro);
    }
}
function moveDown() {
    unDraw(currentTetro);
    currentPosition += width;
    draw(currentTetro);
    freeze(currentTetro);
};
function moveRight() {
    unDraw(currentTetro);
    if (!(currentTetro.some(index => squares[currentPosition + index].classList.contains("taken-right")))) currentPosition += 1;
    draw(currentTetro);
};
function moveLeft() {
    unDraw(currentTetro);
    if (!(currentTetro.some(index => squares[currentPosition + index].classList.contains("taken-left")))) currentPosition -= 1;
    draw(currentTetro);
};
var currentRotation = 0;
var currentTetro = randomTetro()[currentRotation];
var currentPosition = 3;
draw(currentTetro);
var timerId = setInterval(moveDown, 200);
document.addEventListener("keydown", control);
function control(event) {
    var keyType = event.key;
    if (keyType == "ArrowRight") {
        moveRight();
    }else if (keyType == "ArrowLeft") {
        moveLeft();
    }
    
}


