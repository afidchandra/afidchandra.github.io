const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
const radius = 20;

const stars = [];
const numStars = 100;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        decreasing: Math.random() < 0.5
    });
}

function drawStars() {
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        ctx.closePath();

        if (star.decreasing) {
            star.alpha -= 0.02;
            if (star.alpha <= 0) {
                star.decreasing = false;
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            }
        } else {
            star.alpha += 0.02;
            if (star.alpha >= 1) {
                star.decreasing = true;
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawBall();

    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx;
    }

    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(update);
}

update();
