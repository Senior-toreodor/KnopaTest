export const backgroundMusic = new Audio("assets/Sounds/background.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const winSound = new Audio("assets/Sounds/win.mp3");
winSound.volume = 0.8;

const mergeSound = new Audio("assets/Sounds/merge.mp3");
mergeSound.volume = 1;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let isSoundEnabled = false;

export function toggleMusic() {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    isSoundEnabled = !isSoundEnabled;
    isSoundEnabled ? backgroundMusic.play() : backgroundMusic.pause();
    updateMusicButton();
}

function updateMusicButton() {
    const musicButton = document.getElementById("music-toggle");
    if (musicButton) {
        musicButton.innerHTML = isSoundEnabled ? "🔊" : "🔇";
    }
}

export function createMusicToggleButton() {
    const musicButton = document.createElement("button");
    musicButton.id = "music-toggle";
    musicButton.innerHTML = "🔇";
    musicButton.classList.add("music-button");
    musicButton.addEventListener("click", toggleMusic);
    document.body.appendChild(musicButton);
}

export function playWinSound() {
    if (!isSoundEnabled) return;
    winSound.currentTime = 0;
    winSound.play();
}

export function playMergeSound() {
    if (!isSoundEnabled) return;
    mergeSound.currentTime = 0;
    mergeSound.play();
}
