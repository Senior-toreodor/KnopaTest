import { createImage, spawnNewChair } from "./spawner.js";
import { updateThermometer } from "./thermometer.js";
import { setLastMergedImage } from "./winPanel.js";

const mergeSound = new Audio("assets/Sounds/merge.mp3"); // Шлях до звуку мерджа
mergeSound.volume = 1; // Налаштування гучності

export function move(direction) {
    const boxes = document.querySelectorAll(".color-box");
    let grid = getGridState(boxes);
    let merged = false;

    if (direction === "left") merged = moveLeft(grid);
    else if (direction === "right") merged = moveRight(grid);
    else if (direction === "up") merged = moveUp(grid);
    else if (direction === "down") merged = moveDown(grid);

    if (merged) {
        mergeSound.play(); // Відтворюємо звук при злитті
    }

    updateGrid(grid, boxes);
    updateThermometer();
    spawnNewChair();
}

function getGridState(boxes) {
    return Array.from(boxes).map(box => {
        const img = box.querySelector("img");
        return img ? Number(img.dataset.level) : null;
    });
}

function updateGrid(grid, boxes) {
    let highestMergedLevel = 0;

    grid.forEach((level, index) => {
        if (level !== null) {
            createImage(index, level);
            highestMergedLevel = Math.max(highestMergedLevel, level);
        } else {
            boxes[index].innerHTML = '';
        }
    });

    const assets = ["assets/chair.png", "assets/table.png", "assets/wardrobe.png"];
    setLastMergedImage(assets[Math.min(highestMergedLevel, assets.length - 1)]);
}

// Логіка руху (оновлена для перевірки мерджу)
function moveLeft(grid) {
    let merged = false;
    for (let i = 0; i < 3; i++) {
        if (i % 2 === 1) continue;
        if (grid[i] !== null && grid[i] === grid[i + 1]) {
            grid[i] += 1;
            grid[i + 1] = null;
            merged = true;
        } else if (grid[i] === null) {
            grid[i] = grid[i + 1];
            grid[i + 1] = null;
        }
    }
    return merged;
}

function moveRight(grid) {
    let merged = false;
    for (let i = 3; i > 0; i--) {
        if (i % 2 === 0) continue;
        if (grid[i] !== null && grid[i] === grid[i - 1]) {
            grid[i] += 1;
            grid[i - 1] = null;
            merged = true;
        } else if (grid[i] === null) {
            grid[i] = grid[i - 1];
            grid[i - 1] = null;
        }
    }
    return merged;
}

function moveUp(grid) {
    let merged = false;
    for (let i = 0; i < 2; i++) {
        if (grid[i] !== null && grid[i] === grid[i + 2]) {
            grid[i] += 1;
            grid[i + 2] = null;
            merged = true;
        } else if (grid[i] === null) {
            grid[i] = grid[i + 2];
            grid[i + 2] = null;
        }
    }
    return merged;
}

function moveDown(grid) {
    let merged = false;
    for (let i = 2; i >= 0; i--) {
        if (grid[i + 2] !== null && grid[i + 2] === grid[i]) {
            grid[i + 2] += 1;
            grid[i] = null;
            merged = true;
        } else if (grid[i + 2] === null) {
            grid[i + 2] = grid[i];
            grid[i] = null;
        }
    }
    return merged;
}
