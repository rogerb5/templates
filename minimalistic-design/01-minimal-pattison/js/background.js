const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const pauseBtn = document.querySelector('button.nav-btn');

const TOTAL = 100;
const petalArray = [];
let animationPaused = false; // Add this variable to control animation state

const petalImg = new Image();
petalImg.src = '../img/petal.png';
petalImg.onload = () => {
    for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal());
    }
    console.log(petalArray);
    render();
};

// Add a click event listener to the canvas to toggle animation state
pauseBtn.addEventListener('click', () => {
    animationPaused = !animationPaused;
    pauseBtn.textContent = 'Start';
    if (!animationPaused) {
        render();
        pauseBtn.textContent = 'Pause';
    }
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach(petal => {
        petal.animate();
    });
    if (!animationPaused) {
        window.requestAnimationFrame(render);
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Start */

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.w = 30 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 45;
        this.xSpeed = 0.5 + Math.random();
        this.ySpeed = 0.3 + Math.random() * 0.5;
        this.flip = Math.random() * 0.5;
        this.flipSpeed = Math.random() * 0.03;
    }

    draw() {
        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -petalImg.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.xSpeed = 2 + Math.random();
            this.ySpeed = 1 + Math.random() * 0.5;
            this.flip = Math.random();
        }

        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            petalImg,
            this.x,
            this.y,
            this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
            this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 2))
        );
    }

    animate() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.draw();
        this.flip += this.flipSpeed;
    }
}
