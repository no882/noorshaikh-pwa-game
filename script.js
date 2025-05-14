let player = document.getElementById("player");
let game = document.getElementById("game");
let scoreEl = document.getElementById("score");
let score = 0;
let playerLeft = 50;

function jump() {
  if (!player.classList.contains("jump")) {
    player.classList.add("jump");
    player.style.bottom = "100px";
    setTimeout(() => {
      player.style.bottom = "10px";
      player.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("touchstart", jump);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

function createCoin() {
  let coin = document.createElement("div");
  coin.classList.add("coin");
  coin.style.left = "100vw";
  game.appendChild(coin);

  let move = setInterval(() => {
    let left = parseInt(getComputedStyle(coin).left);
    if (left < -30) {
      coin.remove();
      clearInterval(move);
    } else {
      coin.style.left = left - 5 + "px";

      let playerRect = player.getBoundingClientRect();
      let coinRect = coin.getBoundingClientRect();

      if (
        playerRect.left < coinRect.right &&
        playerRect.right > coinRect.left &&
        playerRect.top < coinRect.bottom &&
        playerRect.bottom > coinRect.top
      ) {
        score++;
        scoreEl.innerText = "Score: " + score;
        coin.remove();
        clearInterval(move);
      }
    }
  }, 30);
}

function createObstacle() {
  let obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = "100vw";
  game.appendChild(obs);

  let move = setInterval(() => {
    let left = parseInt(getComputedStyle(obs).left);
    if (left < -30) {
      obs.remove();
      clearInterval(move);
    } else {
      obs.style.left = left - 5 + "px";

      let playerRect = player.getBoundingClientRect();
      let obsRect = obs.getBoundingClientRect();

      if (
        playerRect.left < obsRect.right &&
        playerRect.right > obsRect.left &&
        playerRect.top < obsRect.bottom &&
        playerRect.bottom > obsRect.top
      ) {
        alert("Game Over! Score: " + score);
        location.reload();
      }
    }
  }, 30);
}

setInterval(createCoin, 2000);
setInterval(createObstacle, 3000);
