// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Canvas Setup
const canvas = document.getElementById('universeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Spaceship (Triangle) Class
class Spaceship {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 20;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#00cc66';
        this.lasers = [];
        this.shootCooldown = 0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Shoot lasers
        if (this.shootCooldown <= 0) {
            this.lasers.push(new Laser(this.x, this.y));
            this.shootCooldown = 30; // Frames between shots
        } else {
            this.shootCooldown--;
        }

        // Update lasers
        this.lasers = this.lasers.filter(laser => laser.life > 0);
        this.lasers.forEach(laser => laser.update());
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x - this.size, this.y + this.size);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.closePath();
        ctx.fill();

        this.lasers.forEach(laser => laser.draw());
    }
}

// Laser Class
class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = -5;
        this.length = 10;
        this.life = 50; // Frames until disappearance
        this.color = '#ff3366';
    }

    update() {
        this.y += this.speedY;
        this.life--;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.length);
        ctx.stroke();
    }
}

// Target (Ball) Class
class Target {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 5 + 3;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = '#6666ff';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Game Objects
const spaceships = [];
const targets = [];

for (let i = 0; i < 3; i++) spaceships.push(new Spaceship());
for (let i = 0; i < 10; i++) targets.push(new Target());

// Collision Detection
function checkCollision(laser, target) {
    const dx = laser.x - target.x;
    const dy = laser.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < target.radius + 2; // Laser width
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw spaceships
    spaceships.forEach(spaceship => {
        spaceship.update();
        spaceship.draw();
    });

    // Update and draw targets
    targets.forEach((target, tIndex) => {
        target.update();
        target.draw();

        // Check for laser hits
        spaceships.forEach(spaceship => {
            spaceship.lasers.forEach((laser, lIndex) => {
                if (checkCollision(laser, target)) {
                    targets.splice(tIndex, 1); // Remove target
                    spaceship.lasers.splice(lIndex, 1); // Remove laser
                    targets.push(new Target()); // Respawn new target
                }
            });
        });
    });

    requestAnimationFrame(animate);
}
animate();

// Portfolio Interactivity
document.addEventListener('DOMContentLoaded', () => {
    const demoButtons = document.querySelectorAll('.demo-btn');
    demoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Demo coming soon! Replace with your game demo URL.');
        });
    });

    const sourceButtons = document.querySelectorAll('.source-btn');
    sourceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Source code coming soon! Replace with your GitHub repo URL.');
        });
    });

    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});