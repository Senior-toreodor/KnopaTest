
import { showWinPanel } from "./winPanel.js";

let currentSectionIndex;

export function updateThermometer() {
    const thermometerSections = document.querySelectorAll(".thermometer .section");

    if (currentSectionIndex === undefined) {
        currentSectionIndex = thermometerSections.length - 1; // Ініціалізація при першому виклику
    }

    if (currentSectionIndex >= 0) {
        thermometerSections[currentSectionIndex].classList.add("active");
        currentSectionIndex--;
    }

    if (currentSectionIndex < 0) {
        setTimeout(() => {
            showWinPanel(); // Викликаємо панель перемоги
        }, 500);
    }
}
