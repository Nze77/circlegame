const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;
const dotRadius = 10;
const rotationSpeed = 0.025; // Speed of rotation
let angle = 0;
let score = 0;
let timeLeft = 120;
let timer;

function getRandomShadedArea() {
    const start = Math.random() * (2 * Math.PI);
    const size = (Math.random() * (Math.PI / 3 - Math.PI / 8)) + Math.PI / 8;
    return { startAngle: start, endAngle: start + size };
}

let shadedArea = getRandomShadedArea();

function update() {
    angle += rotationSpeed;
    if (angle >= 2 * Math.PI) {
        angle -= 2 * Math.PI;
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 20;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, shadedArea.startAngle, shadedArea.endAngle);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 20;
    ctx.stroke();

    const dotX = centerX + radius * Math.cos(angle);
    const dotY = centerY + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
    ctx.fillText("Time: " + timeLeft, 20, 60);
}

function checkHit() {
    if (angle >= shadedArea.startAngle && angle <= shadedArea.endAngle) {
        score++;
        shadedArea = getRandomShadedArea();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            checkHit();
        }
    });
});

function restartGame() {
    score = 0;
    timeLeft = 60;
    angle = 0;
    shadedArea = getRandomShadedArea();
    gameLoop();
    startTimer();
}

function createRestartButton() {
    const button = document.createElement("button");
    button.innerText = "Restart";
    button.style.position = "absolute";
    button.style.top = "50%";
    button.style.left = "50%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.padding = "10px 20px";
    button.style.fontSize = "20px";
    button.style.display = "none";
    document.body.appendChild(button);
    
    button.addEventListener("click", () => {
        button.style.display = "none";
        restartGame();
    });
    
    return button;
}

const restartButton = createRestartButton();

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Game Over! Your Score: " + score);
            restartButton.style.display = "block";
            setTimeout(restartGame, 10000); // Restart after 10 seconds
        }
    }, 1000);
}

startTimer();
