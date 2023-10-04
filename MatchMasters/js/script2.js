const CARD_DECK = "https://deckofcardsapi.com/api/deck/new/draw/?count=";

const wrap = document.querySelector(".grid-wrap");
const message = document.querySelector(".message");
const pairCount = document.querySelector(".pair-count");
const maxGrid = 108;

let cards = [];
let currentGridSize = 4; 
let flippedCards = [];
let matchedPairs = 0;

function increaseGrid() {
    currentGridSize += 4;
    
    if (currentGridSize > maxGrid) {
        console.log("Max grid reached!");
    } else {
        clearGrid();
        createGrid(currentGridSize);
        setGridStyles(currentGridSize);
    }
}

function setGridStyles(gridSize) {
    const gridStyles = {
        8: { columns: 4 },
        20: { columns: 5 },
        24: { columns: 6 },
        28: { columns: 7 },
        32: { columns: 8 },
        36: { columns: 9 },
        40: { columns: 10, childHeight: "8vw", childWidth: "5vw" },
        44: { columns: 12, childHeight: "5vw", childWidth: "4vw" },
        84: { columns: 16, childHeight: "5vw", childWidth: "4vw" },
    };

    const options = gridStyles[gridSize];
    if (options) {
        wrap.style.gridTemplateColumns = `repeat(${options.columns}, 1fr)`;

        const children = wrap.children;
        for (const child of children) {
            if (options.childHeight) {
                child.style.height = options.childHeight;
            }
            if (options.childWidth) {
                child.style.width = options.childWidth;
            }
        }
    }
}

function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    clearGrid();
    // Append the shuffled cards back to the wrap
    cards.forEach(div => wrap.appendChild(div));
}


async function createGrid(gridSize) {
    const numberOfPairs = gridSize / 2;
    const data = await fetchCardData(numberOfPairs);
    cards = [];

    const identifiers = Array.from({ length: numberOfPairs }, (_, i) => i);
    const pairs = [...identifiers, ...identifiers];
    shuffle(pairs);

    for (let i = 0; i < pairs.length; i++) {     
        const pairIndex = pairs[i];
        let img = data.cards[pairIndex].image; 
        const card = createCard(pairIndex, img);
        cards.push(card);
    }
    
    addFlipCards();
}

async function fetchCardData(numberOfPairs) {
    const response = await fetch(CARD_DECK + numberOfPairs);
    return response.json();
}

function clearGrid() {
    wrap.innerHTML = "";
}

function createCard(num, img) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.textContent = num;
    flipCardBack.style.backgroundImage = `url(${img})`;
    
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    wrap.appendChild(flipCard);
    return flipCard;
}

function addFlipCards() {
    // Select all elements with the class "flip-card" (representing individual cards)
    const flipCards = document.querySelectorAll('.flip-card');

    // Iterate through each card and set up a click event listener
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            // Select the inner element of the clicked card (front and back of the card)
            const flipCardInner = card.querySelector('.flip-card-inner');

            // Check if the card is not already flipped and fewer than two cards are flipped
            if (!flipCardInner.classList.contains('flipped') && flippedCards.length < 2) {
                // Flip the card by adding the "flipped" class
                flipCardInner.classList.add('flipped');

                // Add the clicked card to the array of flipped cards
                flippedCards.push(card);

                // Check if two cards are flipped
                if (flippedCards.length === 2) {
                    // Store the two flipped cards in variables for comparison
                    const card1 = flippedCards[0];
                    const card2 = flippedCards[1];

                    // Check if the content of the two cards matches
                    if (card1.textContent === card2.textContent) {
                        // Mark both cards as "matched"
                        card1.classList.add('matched');
                        card2.classList.add('matched');

                        // Increment the matchedPairs count
                        matchedPairs++;

                        // Update the displayed pair count
                        pairCount.innerText = `Pairs: ${matchedPairs}`;

                        // Check if all pairs are matched (game over)
                        if (matchedPairs === currentGridSize / 2) {
                            // Call the "winner" function after a 1-second delay
                            setTimeout(() => {
                                winner();
                            }, 1000);
                        }
                    } else {
                        // Cards do not match, flip them back after 1 second
                        setTimeout(() => {
                            card1.querySelector('.flip-card-inner').classList.remove('flipped');
                            card2.querySelector('.flip-card-inner').classList.remove('flipped');
                        }, 1000);
                    }

                    // Clear the flipped cards array to allow selection of new cards
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
        message.innerText = "You win this round! On to the next!"
        setTimeout(() => {
                message.innerText = ""
        }, 2000)
    }
    
    increaseGrid();
    matchedPairs = 0;
}

createGrid(currentGridSize);
