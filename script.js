"use strict";

// Detect which page we're on
const currentPath = window.location.pathname.toLowerCase();
const isMiniGame = currentPath.endsWith("minigame.html");

// Canvas Setup
const canvas = document.getElementById("universeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Global Variables
let stars = [];
let player;
let enemies;
let explosions;
let mouseTracer;
let score = 0;
let enemySpawnCooldown = 150;

// Mini-game variables
let miniGameTime = 0;
let lives = 0;
let isGameOver = false;
let sessionHighScore = 0;
let noSpecialBalls = false;

// Keyboard Controls
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowUp: false,
};
document.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
    e.preventDefault();
  }
});
document.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

// Mouse Movement
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  if (mouseTracer) {
    mouseTracer.update(mouseX, mouseY);
  }
});

// Navigation for normal balls
function navigateTo(type) {
  switch (type) {
    case 0:
      // Portfolio Download or link
      window.location.href = "portfolio.html";
      break;
    case 1:
      // Explore
      window.location.href = "portfolio.html";
      break;
    case 2:
      // About
      window.location.href = "about.html";
      break;
    case 3:
      // Contact
      window.location.href = "contact.html";
      break;
  }
}

// Star Class
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random();
    this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
    this.speed = Math.random() * 0.03 + 0.02;
  }
  update() {
    this.alpha += Math.random() * 0.03 - 0.015;
    if (this.alpha < 0) this.alpha = 0;
    if (this.alpha > 1) this.alpha = 1;
    this.x -= this.speed;
    if (this.x < 0) this.x = canvas.width;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Particle Class
class Particle {
  constructor(x, y, color, size = Math.random() * 2 + 1) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.life = 30;
    this.color = color;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life / 30;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Mouse Tracer
class MouseTracer {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.particles = [];
    this.color = "#00ff99";
    this.pulse = 0;
  }
  update(x, y) {
    this.x = x;
    this.y = y;
    this.pulse += 0.1;
    this.particles.push(new Particle(this.x, this.y, this.color));
    this.particles.push(new Particle(this.x, this.y, this.color));
    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((p) => p.update());
  }
  draw() {
    const glowSize = 6 + Math.sin(this.pulse) * 2;
    ctx.shadowBlur = 25;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    this.particles.forEach((p) => p.draw());
  }
}

// Player
class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 100;
    this.size = 20;
    this.speed = 5;
    this.color = "#00cc66";
    this.particles = [];
    this.shootCooldown = 0;
    this.lasers = [];
  }
  update() {
    if (keys.ArrowLeft) this.x -= this.speed;
    if (keys.ArrowRight) this.x += this.speed;
    if (keys.ArrowDown) this.y += this.speed;

    if (this.x < this.size) this.x = this.size;
    if (this.x > canvas.width - this.size) this.x = canvas.width - this.size;
    if (this.y < this.size) this.y = this.size;
    if (this.y > canvas.height - this.size) this.y = canvas.height - this.size;

    // Engine
    this.particles.push(new Particle(this.x, this.y + this.size, this.color));
    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((p) => p.update());

    // Continuous shooting if up arrow is held
    if (keys.ArrowUp) {
      this.shoot();
    } else if (this.shootCooldown > 0) {
      this.shootCooldown--;
    }

    // Update lasers
    this.lasers = this.lasers.filter((l) => l.life > 0);
    this.lasers.forEach((l) => l.update());
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo(-this.size, this.size);
    ctx.lineTo(this.size, this.size);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    this.lasers.forEach((l) => l.draw());
    this.particles.forEach((p) => p.draw());
  }
  shoot() {
    if (this.shootCooldown <= 0) {
      this.lasers.push(new Laser(this.x, this.y));
      this.shootCooldown = 25;
    }
  }
}

// Laser
class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = -5;
    this.length = 10;
    this.life = 60;
    this.color = "#ff3366";
    this.particles = [];
  }
  update() {
    this.y += this.speedY;
    this.life--;
    this.particles.push(new Particle(this.x, this.y, this.color));
    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((p) => p.update());
  }
  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.length);
    ctx.stroke();
    this.particles.forEach((p) => p.draw());
  }
}

// Enemy
class Enemy {
  constructor(type) {
    // Try to keep spacing
    let candidateX;
    let attempts = 0;
    do {
      candidateX = Math.random() * (canvas.width - 30) + 15;
      attempts++;
    } while (
      enemies &&
      enemies.some((e) => Math.abs(e.x - candidateX) < 40) &&
      attempts < 10
    );

    this.x = candidateX;
    this.y = -20;
    this.radius = 15;
    this.type = type; // 0..3 normal, 4 special
    this.isSpecial = type === 4;

    if (isMiniGame) {
      // No special balls in mini-game
      this.isSpecial = false;
      if (type === 4) {
        this.type = Math.floor(Math.random() * 4);
      }
    }

    // Speed
    this.baseSpeed = isMiniGame
      ? Math.random() * 0.3 + 0.2
      : Math.random() * 0.2 + 0.1;

    this.color = this.getColor(this.type);
    this.particles = [];
    this.hue = 0;
  }
  getColor(type) {
    switch (type) {
      case 0:
        return "#ff3366";
      case 1:
        return "#00cc66";
      case 2:
        return "#6666ff";
      case 3:
        return "#ffcc00";
      case 4:
        return "#ffffff"; // will cycle if special
      default:
        return "#ffffff";
    }
  }
  update() {
    if (this.isSpecial) {
      this.hue = (this.hue + 4) % 360;
      this.color = `hsl(${this.hue}, 100%, 50%)`;
    }
    const extraSpeed = isMiniGame ? miniGameTime * 0.001 : 0;
    this.y += this.baseSpeed + extraSpeed;

    this.particles.push(new Particle(this.x, this.y, this.color));
    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((p) => p.update());
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    this.particles.forEach((p) => p.draw());
  }
}

// Explosion
class Explosion {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 20; i++) {
      this.particles.push(new Particle(x, y, color, Math.random() * 4 + 2));
    }
  }
  update() {
    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((p) => p.update());
  }
  draw() {
    this.particles.forEach((p) => p.draw());
  }
}

// Check bottom line in mini-game
function checkBottomLine(enemy, index) {
  if (enemy.y - enemy.radius > canvas.height - 10) {
    enemies.splice(index, 1);
    lives--;
    if (lives <= 0) {
      isGameOver = true;
    }
  }
}
function drawMiniGameUI() {
  // Red line
  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 10);
  ctx.lineTo(canvas.width, canvas.height - 10);
  ctx.stroke();
  ctx.restore();

  // Hearts in top-right
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  const offsetX = canvas.width - 40;
  const offsetY = 60;
  for (let i = 0; i < lives; i++) {
    ctx.fillText("♥", offsetX - i * 36, offsetY);
  }
}
function drawGameOver() {
  if (score > sessionHighScore) {
    sessionHighScore = score;
  }
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
  ctx.font = "30px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
  ctx.fillText(`High Score: ${sessionHighScore}`, canvas.width / 2, canvas.height / 2 + 50);
  ctx.restore();
}

// initGame
function initGame() {
  // Starfield
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  enemies = [];
  explosions = [];
  mouseTracer = new MouseTracer();
  score = 0;
  enemySpawnCooldown = 150;
  isGameOver = false;
  miniGameTime = 0;

  if (isMiniGame) {
    // mini-game
    lives = 3;
    noSpecialBalls = true;
    player = new Player();
  } else {
    // normal game
    player = new Player();
    noSpecialBalls = false;
  }
}

// Animation Loop
function animate() {
  if (isMiniGame && isGameOver) {
    drawGameOver();
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Starfield
  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  // If we have a player
  if (player) {
    if (isMiniGame) {
      miniGameTime++;
    }
    player.update();
    player.draw();

    // Spawn enemies
    if (enemySpawnCooldown <= 0) {
      if (!isMiniGame || enemies.length < 5) {
        let type = Math.floor(Math.random() * 5);
        if (isMiniGame && noSpecialBalls && type === 4) {
          type = Math.floor(Math.random() * 4);
        }
        enemies.push(new Enemy(type));
      }
      if (isMiniGame) {
        const dynamicCooldown = Math.max(150 - Math.floor(miniGameTime * 0.5), 20);
        enemySpawnCooldown = dynamicCooldown;
      } else {
        enemySpawnCooldown = 150;
      }
    } else {
      enemySpawnCooldown--;
    }

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.update();
      enemy.draw();

      // Check collision with lasers
      for (let j = player.lasers.length - 1; j >= 0; j--) {
        const laser = player.lasers[j];
        const dx = enemy.x - laser.x;
        const dy = enemy.y - laser.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < enemy.radius + 2) {
          // Explosion
          explosions.push(new Explosion(enemy.x, enemy.y, enemy.color));

          // If special & not miniGame => redirect to minigame.html
          if (enemy.isSpecial && !isMiniGame) {
            window.location.href = "minigame.html";
            return; // stop
          }

          // If normal & not miniGame => normal redirect
          if (!isMiniGame && !enemy.isSpecial) {
            navigateTo(enemy.type);
          }

          // Otherwise, just add 10 points
          score += 10;
          enemies.splice(i, 1);
          player.lasers.splice(j, 1);
          break;
        }
      }

      // If miniGame, check bottom line
      if (isMiniGame) {
        checkBottomLine(enemy, i);
      } else {
        // Remove if off-screen
        if (enemy.y > canvas.height + enemy.radius) {
          enemies.splice(i, 1);
        }
      }
    }

    // Explosions
    for (let e = explosions.length - 1; e >= 0; e--) {
      explosions[e].update();
      explosions[e].draw();
      if (explosions[e].particles.length === 0) {
        explosions.splice(e, 1);
      }
    }

    // Update score text
    const scoreEl = document.getElementById("score");
    if (scoreEl) {
      scoreEl.textContent = `Score: ${score}`;
    }

    // If miniGame, draw red line & hearts
    if (isMiniGame && !isGameOver) {
      drawMiniGameUI();
    }
  }

  // Mouse tracer
  if (mouseTracer) {
    mouseTracer.draw();
  }

  requestAnimationFrame(animate);
}

// Start
initGame();
animate();
