const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll(".next-btn");

let currentScreen = 0;
let musicStarted = false;
let finaleStarted = false;

function typeWriter(element, text, speed = 35, callback) {
    element.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

function showScreen(index) {
    screens.forEach(screen => screen.classList.remove("active"));
    screens[index].classList.add("active");

    const message = screens[index].querySelector(".message");
    const hiddenText = screens[index].querySelector(".hidden-text");

    if (message && hiddenText) {
        if (index === screens.length - 1) {
            typeWriter(message, hiddenText.innerText.trim(), 30, () => {
                setTimeout(() => {
                    if (!finaleStarted) {
                        startFinale(screens[index]);
                        finaleStarted = true;
                    }
                }, 500);
            });
        } else {
            typeWriter(message, hiddenText.innerText.trim(), 30);
        }
    }
}

function createParticles(container) {
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${3 + Math.random() * 4}s`;
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        container.appendChild(particle);
    }
}

function createSprinkles(container) {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8a5b", "#a8e6cf", "#ffb3d9"];
    for (let i = 0; i < 25; i++) {
        const sprinkle = document.createElement("div");
        sprinkle.className = "sprinkle";
        sprinkle.style.left = `${Math.random() * 100}%`;
        sprinkle.style.top = `${Math.random() * 100}%`;
        sprinkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sprinkle.style.setProperty("--rotate", `${Math.random() * 360}deg`);
        sprinkle.style.transitionDelay = `${i * 0.03}s`;
        container.appendChild(sprinkle);
    }
}

function createConfetti() {
    const container = document.getElementById("confettiContainer");
    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8a5b", "#a8e6cf", "#ffb3d9", "#7b0202", "#232f73"];
    const shapes = ["square", "circle", "rectangle"];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${2 + Math.random() * 4}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        if (shape === "circle") {
            confetti.style.width = "8px";
            confetti.style.height = "8px";
            confetti.style.borderRadius = "50%";
        } else if (shape === "rectangle") {
            confetti.style.width = "5px";
            confetti.style.height = "12px";
        } else {
            confetti.style.width = "8px";
            confetti.style.height = "8px";
        }

        confetti.style.background = color;
        container.appendChild(confetti);
    }
}

function startFinale(screen) {
    screen.classList.add("dark");

    const particlesContainer = document.getElementById("particlesContainer");
    createParticles(particlesContainer);
    setTimeout(() => particlesContainer.classList.add("active"), 500);

    const sprinklesContainer = document.getElementById("sprinklesContainer");
    createSprinkles(sprinklesContainer);

    const cake = document.getElementById("finaleCake");
    const plate = cake.querySelector(".cake-plate");
    const layer1 = cake.querySelector(".cake-layer-1");
    const cream1 = cake.querySelector(".cream-layer-1");
    const layer2 = cake.querySelector(".cake-layer-2");
    const cream2 = cake.querySelector(".cream-layer-2");
    const layer3 = cake.querySelector(".cake-layer-3");
    const creamTop = cake.querySelector(".cream-top");
    const drips = cake.querySelectorAll(".frosting-drip");
    const cherries = cake.querySelectorAll(".cherry");
    const sprinkles = cake.querySelectorAll(".sprinkle");
    const candleHolder = cake.querySelector(".candle-holder");
    const candle = cake.querySelector(".candle");
    const flameContainer = cake.querySelector(".flame-container");

    setTimeout(() => plate.classList.add("show"), 1000);
    setTimeout(() => layer1.classList.add("show"), 1800);
    setTimeout(() => cream1.classList.add("show"), 2600);
    setTimeout(() => layer2.classList.add("show"), 3400);
    setTimeout(() => cream2.classList.add("show"), 4200);
    setTimeout(() => layer3.classList.add("show"), 5000);
    setTimeout(() => creamTop.classList.add("show"), 5800);
    setTimeout(() => drips.forEach(d => d.classList.add("show")), 6600);
    setTimeout(() => cherries.forEach(c => c.classList.add("show")), 7400);
    setTimeout(() => sprinkles.forEach(s => s.classList.add("show")), 7800);
    setTimeout(() => candleHolder.classList.add("show"), 8200);
    setTimeout(() => candle.classList.add("show"), 8800);
    setTimeout(() => {
        flameContainer.classList.add("show");
        createConfetti();
    }, 9600);

    setTimeout(() => document.getElementById("line1").classList.add("show"), 10200);
    setTimeout(() => document.getElementById("line2").classList.add("show"), 10800);
    setTimeout(() => document.getElementById("line3").classList.add("show"), 12800);
    setTimeout(() => document.getElementById("line4").classList.add("show"), 13300);
}

nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!musicStarted) {
            const music = document.getElementById("birthdayMusic");
            if (music) {
                music.volume = 0.25;
                music.play().catch(() => { });
                musicStarted = true;
            }
        }
        if (currentScreen < screens.length - 1) {
            currentScreen++;
            showScreen(currentScreen);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
});

showScreen(0);
