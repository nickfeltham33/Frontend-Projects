const CARD_DECK = "https://deckofcardsapi.com/api/deck/new/draw/?count="

const wrap = document.querySelector(".grid-wrap");
const message = document.querySelector(".message");
const pairCount = document.querySelector(".pair-count")
const maxGrid = 108;

let cards = [];
let currentGridSize = 4; 
let flippedCards = [];
let matchedPairs = 0;


function increaseGrid() {
    currentGridSize += 4;
    
    if (currentGridSize > maxGrid) {
        console.log("Max grid reached!");
    } 
    else {
        clearGrid();
        createGrid(currentGridSize);
        if (currentGridSize === 8) {
            wrap.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (currentGridSize === 20) {
            wrap.style.gridTemplateColumns = "repeat(5, 1fr)";
        } else if (currentGridSize === 24) {
            wrap.style.gridTemplateColumns = "repeat(6, 1fr)";
        } else if (currentGridSize === 28) {
            wrap.style.gridTemplateColumns = "repeat(7, 1fr)";
        } else if (currentGridSize === 32) {
            wrap.style.gridTemplateColumns = "repeat(8, 1fr)";
        } else if (currentGridSize === 36) {
            wrap.style.gridTemplateColumns = "repeat(9, 1fr)";
        } else if (currentGridSize === 40) {
            wrap.style.gridTemplateColumns = "repeat(10, 1fr)";
            const children = wrap.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "8vw";
                child.style.width = "5vw";
            }        
        } else if (currentGridSize >= 44 && currentGridSize < 84) {
            wrap.style.gridTemplateColumns = "repeat(12, 1fr)";
            const children = wrap.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        } else if (currentGridSize >= 84) {
            wrap.style.gridTemplateColumns = "repeat(16, 1fr)";
            const children = wrap.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        }
    }
}

function shuffle() {
    console.log("Shuffle Called!");
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    // Append the shuffled cards back to the wrap
    // cards.forEach(div => wrap.appendChild(div));
}

async function createGrid(gridSize) {
    const numberOfPairs = gridSize / 2;
    const promise = await fetch(CARD_DECK + numberOfPairs);
    const data = await promise.json();

    cards = [];

    // Create an array of unique identifiers for the card pairs
    const identifiers = Array.from({ length: numberOfPairs }, (_, i) => i);

    // Duplicate the identifiers to create pairs
    const pairs = [...identifiers, ...identifiers];

    // Shuffle the pairs
    shuffle(pairs);

    for (let i = 0; i < pairs.length; i++) {     
        const pairIndex = pairs[i];
        let img = data.cards[pairIndex].image; 
        const card = createElement(pairIndex, img);
        cards.push(card);
    }
    
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

createGrid(currentGridSize);
