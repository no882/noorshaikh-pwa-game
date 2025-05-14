const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let x = 50;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, 100, 30, 30);
  x += 2;
  if (x > canvas.width) x = -30;
  requestAnimationFrame(draw);
}
draw();