import { createImage, spawnNewChair } from "./spawner.js";
import { updateThermometer } from "./thermometer.js";
import { setLastMergedImage } from "./winPanel.js";

export function move(direction) {
    const boxes = document.querySelectorAll(".color-box");
    let grid = getGridState(boxes);

    if (direction === "left") moveLeft(grid);
    else if (direction === "right") moveRight(grid);
    else if (direction === "up") moveUp(grid);
    else if (direction === "down") moveDown(grid);

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

    // Оновлення останньої замерженої картинки
    const assets = ["assets/chair.png", "assets/table.png", "assets/wardrobe.png"];
    setLastMergedImage(assets[Math.min(highestMergedLevel, assets.length - 1)]);
}

// Логіка руху (залишається незмінною)
function moveLeft(grid) {
    for (let i = 0; i < 3; i++) {
        if (i % 2 === 1) continue;
        if (grid[i] !== null && grid[i] === grid[i + 1]) {
            grid[i] += 1;
            grid[i + 1] = null;
        } else if (grid[i] === null) {
            grid[i] = grid[i + 1];
            grid[i + 1] = null;
        }
    }
}

function moveRight(grid) {
    for (let i = 3; i > 0; i--) {
        if (i % 2 === 0) continue;
        if (grid[i] !== null && grid[i] === grid[i - 1]) {
            grid[i] += 1;
            grid[i - 1] = null;
        } else if (grid[i] === null) {
            grid[i] = grid[i - 1];
            grid[i - 1] = null;
        }
    }
}

function moveUp(grid) {
    for (let i = 0; i < 2; i++) {
        if (grid[i] !== null && grid[i] === grid[i + 2]) {
            grid[i] += 1;
            grid[i + 2] = null;
        } else if (grid[i] === null) {
            grid[i] = grid[i + 2];
            grid[i + 2] = null;
        }
    }
}

function moveDown(grid) {
    for (let i = 2; i >= 0; i--) {
        if (grid[i + 2] !== null && grid[i + 2] === grid[i]) {
            grid[i + 2] += 1;
            grid[i] = null;
        } else if (grid[i + 2] === null) {
            grid[i + 2] = grid[i];
            grid[i] = null;
        }
    }
}
