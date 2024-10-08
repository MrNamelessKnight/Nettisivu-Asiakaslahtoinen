const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const originalBox = 20;
const scaleFactor = 1.25;
const box = originalBox * scaleFactor;
const canvasSize = 20;
const canvasWidth = canvasSize * box;
const canvasHeight = canvasSize * box;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let snake, food, direction, nextDirection, score, frameCounter, speed;
let gameOver = false;
let fadeOpacity = 0;
let game;
let paused = false;

function initGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = { x: Math.floor(Math.random() * canvasSize) * box, y: Math.floor(Math.random() * canvasSize) * box };
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    frameCounter = 0;
    speed = 10;
    gameOver = false;
    fadeOpacity = 0;
    paused = false;
    document.getElementById("scoreDisplay").innerText = "Score: " + score;
    document.getElementById("scoreDisplay").style.visibility = "visible"; // Show score on restart
    game = setInterval(draw, 16);
}

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (gameOver || paused) return;
    
    if (event.keyCode === 37 && direction.x === 0) {
        nextDirection = { x: -1, y: 0 };
    } else if (event.keyCode === 38 && direction.y === 0) {
        nextDirection = { x: 0, y: -1 };
    } else if (event.keyCode === 39 && direction.x === 0) {
        nextDirection = { x: 1, y: 0 };
    } else if (event.keyCode === 40 && direction.y === 0) {
        nextDirection = { x: 0, y: 1 };
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    if (newHead.x < 0 || newHead.x >= canvasWidth || newHead.y < 0 || newHead.y >= canvasHeight) {
        return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    if (!gameOver && !paused) {
        if (frameCounter % speed === 0) {
            direction = nextDirection;
            let snakeX = snake[0].x + direction.x * box;
            let snakeY = snake[0].y + direction.y * box;

            if (snakeX === food.x && snakeY === food.y) {
                score++;
                document.getElementById("scoreDisplay").innerText = "Score: " + score;
                food = {
                    x: Math.floor(Math.random() * canvasSize) * box,
                    y: Math.floor(Math.random() * canvasSize) * box
                };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if (collision(newHead, snake)) {
                gameOver = true;
            }

            snake.unshift(newHead);
        }

        frameCounter++;
    }

    // Handle game over fade-out screen
    if (gameOver) {
        fadeOpacity += 0.02;
        document.getElementById("scoreDisplay").style.visibility = "hidden"; // Hide score display on game over
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        if (fadeOpacity >= 0.5) {
            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Pelisi on ohi", canvasWidth / 2, canvasHeight / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Pisteesti: " + score, canvasWidth / 2, canvasHeight / 2 + 40);
            ctx.fillStyle = "yellow";
            ctx.fillText("Paina R aloittaaksesi alusta", canvasWidth / 2, canvasHeight / 2 + 80);
        }
    }

    // Handle paused screen
    if (paused && !gameOver) {
        fadeOpacity += 0.02;
        if (fadeOpacity >= 0.5) fadeOpacity = 0.5; // Cap the fade effect

        ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Paused", canvasWidth / 2, canvasHeight / 2);
        ctx.fillStyle = "yellow";
        ctx.font = "20px Arial";
        ctx.fillText("Press P to Resume", canvasWidth / 2, canvasHeight / 2 + 40);
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === 'r' && gameOver) {
        clearInterval(game);
        initGame();
        fadeOpacity = 0;
    }
    
    if (event.key === 'p' && !gameOver) {
        paused = !paused;
        fadeOpacity = 0;
    }
});

initGame();
