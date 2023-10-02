const wrap = document.querySelector(".grid-wrap");
const message = document.querySelector(".message");
const pairCount = document.querySelector(".pair-count")
const maxGrid = 128;

let cards = [];
let currentGridSize = 4; 
let flippedCards = [];
let matchedPairs = 0;


function increaseGrid() {
    currentGridSize *= 2;
    
    if (currentGridSize > maxGrid) {
        console.log("Max grid reached!");
    } else {
        console.log(currentGridSize);
        clearGrid();
        createGrid(currentGridSize);
        if (currentGridSize === 8) {
            wrap.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (currentGridSize === 16) {
            wrap.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (currentGridSize === 32) {
            wrap.style.gridTemplateColumns = "repeat(8, 1fr)";
        } else if (currentGridSize === 64) {
            wrap.style.gridTemplateColumns = "repeat(8, 1fr)";
            const children = wrap.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        }
        addEventListenersToFlipCards();
        shuffle();
    }
}

function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Append the shuffled cards back to the wrap
    cards.forEach(div => wrap.appendChild(div));
}

function createGrid(gridSize) {
    const numberOfPairs = gridSize / 2;
    for (let i = 0; i < numberOfPairs; i++) {
        createElement(i);
        createElement(i);
    }
    cards = Array.from(wrap.querySelectorAll(".flip-card")); // Update the cards array
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
    flipCardFront.textContent = "Front Content";

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.textContent = `CARD ${num + 1}`;

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
            // Check if the card is already matched or flipped
            if (!flipCardInner.classList.contains('flipped') && flippedCards.length < 2) {
                flipCardInner.classList.add('flipped'); // Flip the card
                flippedCards.push(card);

                // Check if two cards are flipped
                if (flippedCards.length === 2) {
                    const card1 = flippedCards[0];
                    const card2 = flippedCards[1];

                    // Check if the card content matches
                    if (card1.textContent === card2.textContent) {
                        // Cards match, mark them as matched
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        matchedPairs++;
                        pairCount.innerText = `Pairs: ${matchedPairs}`;

                        // Check if all pairs are matched (game over)
                        if (matchedPairs === currentGridSize / 2) {
                            winner();
                        }
                    } else {
                        // Cards do not match, flip them back
                        setTimeout(() => {
                            card1.querySelector('.flip-card-inner').classList.remove('flipped');
                            card2.querySelector('.flip-card-inner').classList.remove('flipped');
                        }, 1000); // Delay for 1 second before flipping back
                    }

                    // Clear the flipped cards array
                    flippedCards = [];
                }
            }
        });
    });
}

const winner = () => {
    if (currentGridSize > maxGrid) {
        message.innerText = "You are the Match Masters Supreme Champion!"
    } else {
        message.innerText = "You win this round!. On to the next!"
        setTimeout(() => {
                message.innerText = ""
        },2000)
    }
    
    increaseGrid();
    matchedPairs = 0;
}


// Initial creation of grid and addition of event listeners
createGrid(currentGridSize);
addEventListenersToFlipCards();
shuffle();
