const CARD_DECK = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"

const wrap = document.querySelector(".grid-wrap");
const message = document.querySelector(".message");
const pairCount = document.querySelector(".pair-count")
const maxGrid = 108;

let cards = [];
let currentGridSize = 4; 
let flippedCards = [];
let matchedPairs = 0;
let cardImgs = [];


// document.getElementById("increase").addEventListener("click", () => {
//     increaseGrid();
// });
async function fetchCards() {
    try {
        const response = await fetch(CARD_DECK);
        const data = await response.json();
        const randomCard = data.cards[0];
        const randomCardImage = randomCard.image;
        createGrid(currentGridSize, randomCardImage); // Call createGrid after fetching the image
    } catch (error) {
        console.error('Error fetching random card image:', error);
        return null;
    }
}


async function increaseGrid() {
    currentGridSize += 4;

    const gridSizeOptions = {
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

    if (currentGridSize <= maxGrid && gridSizeOptions[currentGridSize]) {
        const options = gridSizeOptions[currentGridSize];
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

        clearGrid();
        await fetchCardImage(); // Wait for the image to be fetched
        shuffle();
    } else {
        console.log("Max grid reached!");
    }
}

async function createGrid(gridSize, img) {
    const promises = [];
    const numberOfPairs = gridSize / 2;
    
    for (let i = 0; i < numberOfPairs; i++) {
        createElement(i, img);
        createElement(i, img);
    }
    await Promise.all(promises); // Wait for all cards to be created
    cards = Array.from(wrap.querySelectorAll(".flip-card")); // Update the cards array
    addFlipCards();
}

function clearGrid() {
    wrap.innerHTML = "";
}

function createElement(num, img) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.textContent = num;
    flipCardBack.style.backgroundImage = `url(${img})`
    
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    wrap.appendChild(flipCard);
}

function addFlipCards() {
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
                            setTimeout(() => {
                                winner();
                            },1000);
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


function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

const winner = () => {
    if (currentGridSize > maxGrid) {
        message.innerText = "You are the Match Masters Supreme Champion!"
    } else {
        message.innerText = "You win this round! On to the next!"
        setTimeout(() => {
                message.innerText = ""
        },2000)
    }
    
    increaseGrid();
    matchedPairs = 0;
}


// Initial creation of grid and addition of event listeners
fetchCards()

