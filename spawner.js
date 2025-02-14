
export function spawnChairs() {
    const boxes = document.querySelectorAll(".color-box");
    const randomIndexes = getRandomIndexes(2, boxes.length);
    randomIndexes.forEach(index => {
        createImage(index, 0);
    });
}

export function spawnNewChair() {
    const boxes = document.querySelectorAll(".color-box");
    const emptyBoxes = [...boxes].filter(box => !box.querySelector("img"));
    if (emptyBoxes.length > 0) {
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        createImage([...boxes].indexOf(randomBox), 0);
    }
}

export function createImage(index, level) {
    const boxes = document.querySelectorAll(".color-box");
    const assets = ["assets/chair.png", "assets/table.png", "assets/wardrobe.png"];
    const img = document.createElement("img");
    img.src = assets[level];
    img.dataset.level = level;
    img.classList.add("chair-image");
    boxes[index].innerHTML = '';
    boxes[index].appendChild(img);
}

function getRandomIndexes(count, max) {
    let indexes = new Set();
    while (indexes.size < count) {
        indexes.add(Math.floor(Math.random() * max));
    }
    return [...indexes];
}
