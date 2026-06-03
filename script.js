const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll(".next-btn");

let currentScreen = 0;
let musicStarted = false;

function typeWriter(element, text, speed = 35) {
    element.innerHTML = "";

    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

function showScreen(index) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    screens[index].classList.add("active");

    const message = screens[index].querySelector(".message");
    const hiddenText = screens[index].querySelector(".hidden-text");

    if (message && hiddenText) {
        typeWriter(
            message,
            hiddenText.innerText.trim(),
            30
        );
    }
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

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
});

showScreen(0);