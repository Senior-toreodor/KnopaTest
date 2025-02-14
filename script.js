document.addEventListener("DOMContentLoaded", () => {
    console.log("Ikea Survival Megagame Loaded");

    const boxes = document.querySelectorAll(".color-box");
    const thermometerSections = document.querySelectorAll(".thermometer .section");
    let currentSectionIndex = thermometerSections.length - 1;  

    const winPanelContainer = document.getElementById("win-panel-container");
    const coinsContainer = document.getElementById("coins-container"); 

    const assets = [
        "assets/chair.png",     
        "assets/table.png",     
        "assets/wardrobe.png",  
    ];

    let swipeDisabled = false;

    function getRandomIndexes(count, max) {
        let indexes = new Set();
        while (indexes.size < count) {
            indexes.add(Math.floor(Math.random() * max));
        }
        return [...indexes];
    }

    function spawnChairs() {
        const randomIndexes = getRandomIndexes(2, boxes.length);
        randomIndexes.forEach(index => {
            createImage(index, 0);  
        });
    }

    function spawnNewChair() {
        const emptyBoxes = [...boxes].filter(box => !box.querySelector("img"));
        if (emptyBoxes.length > 0) {
            const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            createImage([...boxes].indexOf(randomBox), 0);
        }
    }

    function createImage(index, level) {
        const img = document.createElement("img");
        img.src = assets[level];
        img.dataset.level = level;
        img.classList.add("chair-image");
        boxes[index].innerHTML = '';  
        boxes[index].appendChild(img);
    }

    function getGridState() {
        return Array.from(boxes).map(box => {
            const img = box.querySelector("img");
            return img ? Number(img.dataset.level) : null;
        });
    }

    function move(direction) {
        let grid = getGridState();

        if (direction === "left") {
            moveLeft(grid);
        } else if (direction === "right") {
            moveRight(grid);
        } else if (direction === "up") {
            moveUp(grid);
        } else if (direction === "down") {
            moveDown(grid);
        }

        updateThermometer();
        updateGrid(grid);
        spawnNewChair(); 
    }

    function moveLeft(grid) {
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 1) continue;
            if (grid[i] === null) {
                grid[i] = grid[i + 1];
                grid[i + 1] = null;
            }
        }
        merge(grid, "left");
    }

    function moveRight(grid) {
        for (let i = 3; i >= 0; i--) {
            if (i % 2 === 0) continue;
            if (grid[i] === null) {
                grid[i] = grid[i - 1];
                grid[i - 1] = null;
            }
        }
        merge(grid, "right");
    }

    function moveUp(grid) {
        for (let i = 0; i < 2; i++) {
            if (grid[i] === null) {
                grid[i] = grid[i + 2];
                grid[i + 2] = null;
            }
        }
        merge(grid, "up");
    }

    function moveDown(grid) {
        for (let i = 2; i >= 0; i--) {
            if (grid[i + 2] === null) {
                grid[i + 2] = grid[i];
                grid[i] = null;
            }
        }
        merge(grid, "down");
    }

    function merge(grid, direction) {
        if (direction === "left") {
            for (let i = 0; i < 3; i++) {
                if (i % 2 === 1) continue;
                if (grid[i] !== null && grid[i] === grid[i + 1]) {
                    if (grid[i] < assets.length - 1) {
                        grid[i] += 1;
                        grid[i + 1] = null;
                    }
                }
            }
        } else if (direction === "right") {
            for (let i = 3; i > 0; i--) {
                if (i % 2 === 0) continue;
                if (grid[i] !== null && grid[i] === grid[i - 1]) {
                    if (grid[i] < assets.length - 1) {
                        grid[i] += 1;
                        grid[i - 1] = null;
                    }
                }
            }
        } else if (direction === "up") {
            for (let i = 0; i < 2; i++) {
                if (grid[i] !== null && grid[i] === grid[i + 2]) {
                    if (grid[i] < assets.length - 1) {
                        grid[i] += 1;
                        grid[i + 2] = null;
                    }
                }
            }
        } else if (direction === "down") {
            for (let i = 2; i >= 0; i--) {
                if (grid[i + 2] !== null && grid[i + 2] === grid[i]) {
                    grid[i + 2] += 1;
                    grid[i] = null;
                }
            }
        }
    }

    function updateGrid(grid) {
        grid.forEach((level, index) => {
            if (level !== null) {
                createImage(index, level);
            } else {
                boxes[index].innerHTML = '';  
            }
        });
    }

    function updateThermometer() {
        if (currentSectionIndex >= 0) {
            thermometerSections[currentSectionIndex].classList.add("active");
            currentSectionIndex--;
        }
     
        setTimeout(() => {
            let newGridState = getGridState();
            let highestLevel = Math.max(...newGridState.filter(level => level !== null));
    
            if (currentSectionIndex < 0) {
                showWinPanel(highestLevel);  
            }
        }, 100); 
    }
    
    function explodeCoins() {
        const numCoins = 100;
    
        coinsContainer.innerHTML = "";  
        coinsContainer.style.display = "block";
    
        for (let i = 0; i < numCoins; i++) {
            const coin = document.createElement("img");
            coin.src = "assets/coin.png";
            coin.classList.add("coin");
            coinsContainer.appendChild(coin);
    
            const fromLeft = Math.random() > 0.5; 
            const startX = fromLeft ? -100 : window.innerWidth + 100;  
            const startY = Math.random() * window.innerHeight;  
     
            const angle = Math.random() * Math.PI - Math.PI / 2;  
            const distance = Math.random() * 500 + 200;
            const targetX = Math.cos(angle) * distance * (fromLeft ? 1 : -1);  
            const targetY = Math.sin(angle) * distance;
     
            coin.style.left = `${startX}px`;
            coin.style.top = `${startY}px`;
    
            const delay = Math.random() * 500;
    
            setTimeout(() => {
                coin.style.transition = `transform 3s cubic-bezier(0.16, 1, 0.3, 1), opacity 3s ease-in-out`;
                coin.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.5})`;
                coin.style.opacity = "0";
            }, delay);
    
            setTimeout(() => {
                coin.remove();
            }, 4000);
        }
    }
      
    
    function graduallyBlurBackground() {
        let blurAmount = 0;
        const maxBlur = 8;
        const interval = setInterval(() => {
            blurAmount += 1;
            winPanelContainer.style.backdropFilter = `blur(${blurAmount}px)`;

            if (blurAmount >= maxBlur) {
                clearInterval(interval);
            }
        }, 0);
    }

    function showWinPanel(highestLevel) {
    const winPanel = document.createElement("div");
    winPanel.classList.add("win-panel");
 
    let mergedImageSrc = assets[highestLevel] || "assets/default.png"; 
    let productLink = "#"; 
 
    if (mergedImageSrc.includes("chair")) {
        productLink = "https://www.ikea.com/de/en/p/nordkisa-open-wardrobe-with-sliding-door-bamboo-00439468/";
    } else if (mergedImageSrc.includes("table")) {
        productLink = "https://www.ikea.com/de/de/p/ingo-tisch-kiefer-14630009/?utm_source=google&utm_medium=cpc&utm_campaign=DE_LC_A3_BEH_0_AO_0_de_Shopping_Brand_HFB08-Dining_0_Standard-LIA&utm_id=system:GOOGLE.campaignid:19450983060.adgroupid:145433948072.creative:643492294221.keyword:.matchtype:.placement:&gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16bxAW_jbD_9ZkDJMUZ60y5w3Ya5hgm_WQKfrZuj90LRG0QqwRTDs37hoCWfYQAvD_BwE&gclsrc=aw.ds";
    } else if (mergedImageSrc.includes("wardrobe")) {
        productLink = "https://www.ikea.com/de/en/p/nordkisa-open-wardrobe-with-sliding-door-bamboo-00439468/";
    }
 
    winPanel.innerHTML = `
        <img src="assets/win.png" alt="Win" class="win-banner">
        <img src="${mergedImageSrc}" alt="Merged Object" class="win-item">
        <p class="win-text">Tap to claim your prize</p>
    `;
 
    winPanel.addEventListener("click", () => {
        window.open(productLink, "_blank");
    });

    winPanelContainer.appendChild(winPanel);
    explodeCoins();
    swipeDisabled = true;
    graduallyBlurBackground();
}
    

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
