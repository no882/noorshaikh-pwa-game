
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 100;
let y = canvas.height - 150;
let speed = 5;
let score = 0;

function drawPlayer() {
  ctx.fillStyle = 'lime';
  ctx.fillRect(x, y, 50, 50);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.fillText('Score: ' + score, 20, 30);
  score++;
  requestAnimationFrame(updateGame);
}

updateGame();
