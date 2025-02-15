import { spawnChairs } from './spawner.js';
import { move } from './movement.js';

export let swipeDisabled = false;

export function disableSwipe() {
    swipeDisabled = true;
}

document.addEventListener("DOMContentLoaded", () => {
    let startX = 0, startY = 0;
 
    const backgroundMusic = new Audio("assets/Sounds/background.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
 
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    function unlockAudio() {
        if (audioContext.state === "suspended") {
            audioContext.resume();
        } 
    }
 
    document.addEventListener("touchstart", unlockAudio, { once: true });
    document.addEventListener("click", unlockAudio, { once: true });

    document.addEventListener("touchstart", (e) => {
        if (swipeDisabled) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
        if (swipeDisabled) return;
        let diffX = e.changedTouches[0].clientX - startX;
        let diffY = e.changedTouches[0].clientY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) move("right");
            else if (diffX < -50) move("left");
        } else {
            if (diffY > 50) move("down");
            else if (diffY < -50) move("up");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (swipeDisabled) return;
        if (e.key === "ArrowLeft") move("left");
        if (e.key === "ArrowRight") move("right");
        if (e.key === "ArrowUp") move("up");
        if (e.key === "ArrowDown") move("down");
    });

    spawnChairs();
});
