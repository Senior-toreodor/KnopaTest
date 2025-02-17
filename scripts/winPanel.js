import { disableSwipe } from './script.js';
import { playWinSound } from './musicController.js';

let lastMergedImage = "assets/chair.png";  
let lastMergedLink = "#";  

export function setLastMergedImage(imageSrc) {
    lastMergedImage = imageSrc;

    if (imageSrc.includes("chair")) {
        lastMergedLink = "https://www.ikea.com/de/en/p/nordkisa-open-wardrobe-with-sliding-door-bamboo-00439468/";
    } else if (imageSrc.includes("table")) {
        lastMergedLink = "https://www.ikea.com/de/de/p/ingo-tisch-kiefer-14630009/";
    } else if (imageSrc.includes("wardrobe")) {
        lastMergedLink = "https://www.ikea.com/de/en/p/nordkisa-open-wardrobe-with-sliding-door-bamboo-00439468/";
    } else {
        lastMergedLink = "#";
    }
}

export function explodeCoins() {
    let coinsContainer = document.getElementById("coins-container");
    if (!coinsContainer) {
        coinsContainer = document.createElement("div");
        coinsContainer.id = "coins-container";
        document.body.appendChild(coinsContainer);
    }

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
            coin.style.transition = "transform 3s cubic-bezier(0.16, 1, 0.3, 1), opacity 3s ease-in-out";
            coin.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.5})`;
            coin.style.opacity = "0";
        }, delay);

        setTimeout(() => {
            coin.remove();
        }, 4000);
    }
} 

export function showWinPanel() {
    let winPanelContainer = document.getElementById("win-panel-container");
    if (!winPanelContainer) {
        winPanelContainer = document.createElement("div");
        winPanelContainer.id = "win-panel-container";
        document.body.appendChild(winPanelContainer);
    }
    winPanelContainer.innerHTML = "";

    const winPanel = document.createElement("div");
    winPanel.classList.add("win-panel");
    winPanel.innerHTML = `
        <div class="win-panel-overlay"></div>
        <div class="win-panel-content">
            <img src="assets/win.png" alt="Win" class="win-banner">
            <img src="${lastMergedImage}" alt="Merged Object" class="win-item">
            <p class="win-text">Tap to claim your prize</p> 
        </div>
    `; 

    winPanel.querySelector(".win-item").addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(lastMergedLink, "_blank");
    });

    winPanelContainer.appendChild(winPanel);
    winPanelContainer.classList.add('active');
 
    playWinSound(); 
 
    explodeCoins();
    
    disableSwipe();   
}
