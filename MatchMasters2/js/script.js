// Gets card deck
const CARD_DECK = "https://www.deckofcardsapi.com/api/deck/new/draw/?count=52";

// gets required divs for actions
const grid = document.getElementById("grid-wrap");
const messageDiv = document.getElementById("message");
const totalDisplay = document.getElementById("total");
const correctDisplay = document.getElementById("correct");
const wrongDisplay = document.getElementById("wrong");
const timerDisplay = document.getElementById("timer");
const increaseBtn = document.getElementById("increase");

increaseBtn.addEventListener("click", function () {
    increaseGrid();
})

// Difficulty buttns
const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

// Sets maximums
const maxGrid = 104;
const deckSize = 52;

// varibale for score keeping
let runningTotal = 1;
let totalCorrect = 0;
let totalWrong = 0;

// Varibales for gameplay
let currentGridSize = 4;
let numberOfPairs = currentGridSize / 2;
let allCards = [];
let flippedCards = [];
let matchedPairs = 0;

// counter for each round
let round = 1;

// Initialize variables
let minutes = 0;
let seconds = 0;

// Set to easy to start
let difficulty = 10;

// Get the cards and push the card objects to an array
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

// Create a shuffled grid of pairs
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
                        runningTotal += 5;
                        totalCorrect++;
                        updateScores();
                        // Check if all pairs are matched (game over)
                        if (matchedPairs === numberOfPairs) {
                            setTimeout(() => {
                                winner();
                            },1000);
                        }
                        } else {
                            runningTotal -= 1;
                            totalWrong++;
                            updateScores();
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

// Function to update the timer display
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    // Check if 10 seconds have passed
    if (seconds % difficulty === 0) {
        runningTotal -= 1; 
        updateScores();
        if (runningTotal <= 0) {
            loser();
        }
    }

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    console.log();
}

const updateScores = () => {
    totalDisplay.innerText = runningTotal;
    wrongDisplay.innerText = totalWrong;
    correctDisplay.innerText = totalCorrect;
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
        } else if (currentGridSize >= 44 && currentGridSize < 66) {
            grid.style.gridTemplateColumns = "repeat(12, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        } else if (currentGridSize >= 66) {
            grid.style.gridTemplateColumns = "repeat(20, 1fr)";
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

// Setting Difficulties
easyBtn.addEventListener("click" , function () {
    difficulty = 10;
});

mediumBtn.addEventListener("click", function(){
    difficulty = 5;
});

hardBtn.addEventListener("click", function () {
    difficulty = 2;
});

const winner = () => {
    if (currentGridSize > maxGrid) {
        messageDiv.innerText = "You are the Match Masters Supreme Champion!"
        return;
    } else {
        round++;
        messageDiv.innerText = `Round: ${round}`
        setTimeout(() => {
                messageDiv.innerText = ""
        },2000)
    }
    increaseGrid();
}

const loser = () => {
    alert("You ran out of points!");
    location.reload();
}

const initializeGame = async () => {
    await populateCardsArray();
    createGrid();
    setInterval(updateTimer, 1000);
}
  
initializeGame();