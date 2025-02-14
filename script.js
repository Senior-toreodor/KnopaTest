 
import { spawnChairs } from './spawner.js';
import { move } from './movement.js'; 

document.addEventListener("DOMContentLoaded", () => { 
    let swipeDisabled = false;

    let startX = 0, startY = 0;
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

    spawnChairs();
});
