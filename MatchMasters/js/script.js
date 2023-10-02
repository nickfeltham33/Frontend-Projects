const wrap = document.querySelector(".grid-wrap");
const maxGrid = 64;
let currentGridSize = 4;

let cards = [];

document.getElementById("button").addEventListener("click", increaseGrid);

function increaseGrid() {
    currentGridSize *= 2;
    
    if (currentGridSize > maxGrid) {
        console.log("Max grid reached!");
    } else {
        clearGrid();
        createGrid(currentGridSize);
        wrap.style.gridTemplateColumns = `repeat(${currentGridSize / 2}, 1fr)`;
        addEventListenersToFlipCards();
        shuffle(); // Shuffle the new cards
    }
}

function createGrid(gridSize) {
    for (let i = 0; i < gridSize / 2; i++) {
        createElement(i);
        createElement(i);
    }
    
    cards = Array.from(wrap.querySelectorAll(".flip-card")); // Update the cards array
}

function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Append the shuffled cards back to the wrap
    cards.forEach(div => wrap.appendChild(div));
}

function clearGrid() {
    wrap.innerHTML = "";
}

function createElement(num) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    flipCardFront.textContent = "FRONT";

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.textContent = `CARD ${num}`;

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    wrap.appendChild(flipCard);
}

function addEventListenersToFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            const flipCardInner = card.querySelector('.flip-card-inner');
            flipCardInner.classList.toggle('flipped'); // Toggle the 'flipped' class
        });
    });
}

// Initial creation of grid and addition of event listeners
createGrid(currentGridSize);
addEventListenersToFlipCards();
shuffle(); // Shuffle the initial cards
