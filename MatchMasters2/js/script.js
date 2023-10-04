const CARD_DECK = "https://www.deckofcardsapi.com/api/deck/new/draw/?count=52";
const grid = document.getElementById("grid-wrap");
const pairCount = document.getElementById("matched-pairs");
const outcomeDiv = document.getElementById("outcome");

const maxGrid = 104;
const deckSize = 52;

let currentGridSize = 4;
let numberOfPairs = currentGridSize / 2;
let allCards = [];
let flippedCards = [];
let matchedPairs = 0;


const populateCardsArray = async () => {
    try {
      const response = await fetch(CARD_DECK);
      const data = await response.json();
      const cards = data.cards.map(card => card);
      allCards.push(...cards);
    } catch (error) {
      console.error('Error fetching random card images:', error);
    }
}

const createGrid = () => {
    matchedPairs = 0;

    for (let i = 0; i < numberOfPairs; i++) {
        createElement(allCards[i]);
        createElement(allCards[i]);
    }
    addFlipCards();
    shuffleCards();
}

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const shuffleCards = () => {
    const cards = Array.from(document.querySelectorAll('.flip-card'));
    const shuffledCards = shuffleArray(cards);
  
    // Remove all cards from the grid
    cards.forEach(card => grid.removeChild(card));
  
    // Append shuffled cards back to the grid in the new order
    shuffledCards.forEach(card => grid.appendChild(card));
}

const createElement = (obj) => {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.style.backgroundImage = `url(${obj.image})`;  

    const flipCardId = document.createElement("div");
    flipCardId.classList.add("card_id")
    flipCardId.innerText = `${obj.code}`;

    
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCardBack.appendChild(flipCardId);
    flipCard.appendChild(flipCardInner);

    grid.appendChild(flipCard);
}

const addFlipCards = () => {
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
                        if (matchedPairs === numberOfPairs) {
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

const increaseGrid = () => {
    currentGridSize += 4;
    numberOfPairs = currentGridSize / 2;

    if (currentGridSize > maxGrid) {
        winner();
    } else {
        clearGrid();
        createGrid(currentGridSize);
        if (currentGridSize === 8) {
            grid.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (currentGridSize === 20) {
            grid.style.gridTemplateColumns = "repeat(5, 1fr)";
        } else if (currentGridSize === 24) {
            grid.style.gridTemplateColumns = "repeat(6, 1fr)";
        } else if (currentGridSize === 28) {
            grid.style.gridTemplateColumns = "repeat(7, 1fr)";
        } else if (currentGridSize === 32) {
            grid.style.gridTemplateColumns = "repeat(8, 1fr)";
        } else if (currentGridSize === 36) {
            grid.style.gridTemplateColumns = "repeat(9, 1fr)";
        } else if (currentGridSize === 40) {
            grid.style.gridTemplateColumns = "repeat(10, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "8vw";
                child.style.width = "5vw";
            }        
        } else if (currentGridSize >= 44 && currentGridSize < 84) {
            grid.style.gridTemplateColumns = "repeat(12, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        } else if (currentGridSize >= 84) {
            grid.style.gridTemplateColumns = "repeat(16, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        }
    }
}

const clearGrid = () => {
    grid.innerHTML = "";
}

const winner = () => {
    if (currentGridSize > maxGrid) {
        outcomeDiv.innerText = "You are the Match Masters Supreme Champion!"
        return;
    } else {
        outcomeDiv.innerText = "You win this round! On to the next!"
        setTimeout(() => {
                outcomeDiv.innerText = ""
        },2000)
    }
    increaseGrid();
}

const initializeGame = async () => {
    await populateCardsArray();
    createGrid();
}
  
initializeGame();