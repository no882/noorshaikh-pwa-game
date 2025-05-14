const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 360;
canvas.height = 640;

let player = { x: 50, y: 500, width: 30, height: 30, speed: 2, vy: 0 };
let gravity = 0.5, jumpPower = -10, score = 0;
let coins = [], obstacles = [];
let gameRunning = true;

function drawPlayer() {
  ctx.fillStyle = "#0288d1";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoins() {
  ctx.fillStyle = "gold";
  for (let coin of coins) {
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawObstacles() {
  ctx.fillStyle = "red";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }
}

function update() {
  player.vy += gravity;
  player.y += player.vy;
  player.x += player.speed;

  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
  if (player.y < 0) player.y = 0;

  coins.forEach((coin, index) => {
    if (Math.abs(player.x - coin.x) < 20 && Math.abs(player.y - coin.y) < 20) {
      coins.splice(index, 1);
      score++;
    }
  });

  obstacles.forEach((obs) => {
    if (player.x < obs.x + obs.width && player.x + player.width > obs.x &&
        player.y < obs.y + obs.height && player.y + player.height > obs.y) {
      gameRunning = false;
    }
  });

  if (Math.random() < 0.02) coins.push({ x: player.x + 360, y: Math.random() * 600 });
  if (Math.random() < 0.01) obstacles.push({ x: player.x + 360, y: 580, width: 30, height: 60 });
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (!gameRunning) return alert("Game Over! Score: " + score);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  drawCoins();
  drawObstacles();
  drawScore();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", () => {
  if (player.y + player.height >= canvas.height) {
    player.vy = jumpPower;
  }
});

gameLoop();