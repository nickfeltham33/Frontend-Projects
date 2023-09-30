const letters = document.querySelectorAll('.letter');
const loadingDiv = document.querySelector('.loading');
const messageDiv = document.getElementById("message");
const reloadBtn = document.querySelector(".reload");


let currentGuess = '';
const ANSWER_LENGTH = 5;
const GUESSES = 6;
let currentRow = 0;
let finished = false;


async function init() {
    // Fetch the word of the day from the API
    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();

    // Extract and format the word to uppercase
    const word = resObj.word.toUpperCase();
    const wordArray = word.split(""); // Split the word into an array of letters
    console.log(word);
    let isLoading = false;
    setLoading(isLoading); // Hide the loading spinner

    // Listen for keyboard events (keydown)
    document.addEventListener("keydown", function handleKeyPress(event) {
        // Ignores inputs until word is ready OR the game is finished
        if (finished || isLoading) {
            // Do nothing and return
            return;
        }
        
        const action = event.key;

        // Handle different key actions
        if (action === 'Enter') {
            commit(wordArray, word, setLoading); // Check the guess if Enter is pressed
        } else if (action === 'Backspace') {
            backspace(); // Handle backspace to remove letters
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase()); // Handle letter input
        } else {
            // Do Nothing for other key actions
        }
    });
}


const isLetter = (letter) => {
    // Takes in a letter and tests against a REGEX 
    return /^[a-zA-Z]$/.test(letter);
}


const commit = async (wordArray, word, setLoading) => {
    // Check if the currentGuess length is not equal to the desired ANSWER_LENGTH
    if (currentGuess.length !== ANSWER_LENGTH) {
        return;
    }

    isLoading = true;
    setLoading(true);

    const res = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({word: currentGuess})
    });

    const resObj = await res.json();
    const { validWord } = resObj;

    isLoading = false;
    setLoading(false);

    if (!validWord) {
        invalidWord();
        return;
    }
    // Split the currentGuess into an array of individual letters
    guessArray = currentGuess.split("");

    // Create a mapping (an object) of letters in the wordArray to their counts
    const map = makeMap(wordArray);

    // Initialize a flag to check if the guess is correct
    let isCorrect = true;

    // Loop through each letter in the guessArray
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        // Check if the guessed letter is in the correct position
        if (guessArray[i] === wordArray[i]) {
            // Add the "correct" class to the corresponding UI element
            letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
            // Decrement the count of this letter in the map
            map[guessArray[i]]--;
        } else {
            isCorrect = false; // The guess is not entirely correct
        }
    }


    // Loop through each letter in the guessArray again
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        // Check if the guessed letter is in the wrong position
        if (guessArray[i] !== wordArray[i]) {
            if (wordArray.includes(guessArray[i]) && map[guessArray[i]] > 0) {
                // Check if the guessed letter exists elsewhere in the word and is available
                // Add the "close" class to the corresponding UI element
                letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
                // Decrement the count of this letter in the map
                map[guessArray[i]]--;
            } else {
                // If the guessed letter is not in the word, add the "wrong" class
                letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
            }
        }
    }

    // Increment the currentRow to move to the next row of guesses
    // Increment before checking the GUESSES limit has been reached.
    currentRow++;
    // Reset the currentGuess to an empty string for the next guess
    currentGuess = '';

    // Check if the guess is correct and handle the game outcome
    if (isCorrect) {
        winner();
        finished = true;
    } else if (currentRow === GUESSES) {
        loser(word);
    }
}


const backspace = () => {
    // Remove the last character from the currentGuess string
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);

    // Clear the corresponding UI element in the letter grid
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
}


const addLetter = (letter) => {
    // Check if the current guess length is less than the ANSWER_LENGTH
    if (currentGuess.length < ANSWER_LENGTH) {
        currentGuess += letter; // Append the letter to the current guess
    } else {
        // If the guess length is equal to ANSWER_LENGTH, replace the last letter
        currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    // Display the letter in the UI element corresponding to the current guess
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
}


// Takes a boolean isLoading as input, set online 15.
const setLoading = (isLoading) => {
    // Toggles the 'show' class on boolean value
    loadingDiv.classList.toggle('show', isLoading);
}


const makeMap = (array) => {
    // object to store letters and values
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        // Get current letter from the array
        const letter = array[i];
        // Check if letter exists in the object
        if (obj[letter]) {
            // if so, increase by 1
            obj[letter]++;
        } else {
            // If it does not, then set to 1
            obj[letter] = 1;
        }
    }
    // Must return the object, I forgot to do this.
    // It was confusing.
    return obj;
}

const invalidWord = () => {
    messageDiv.innerText = "That's not a real word, dude!";
    
    // Apply the "fade" class to trigger the fade-out effect
    messageDiv.classList.add("fade");
    
    // Wait for a short delay, then remove the "fade" class and clear the message
    setTimeout(() => {
        messageDiv.classList.remove("fade");
        messageDiv.innerText = "";
    }, 3000); // Adjust the timeout duration as needed

    // Apply the "invalid" class to the letter elements
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
        
        // Remove the "invalid" class after a short delay
        setTimeout(() => {
            letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");
        }, 500); // Adjust the timeout duration as needed
    }
}


const winner = () => {
    messageDiv.innerText = "YOU'RE A WINNER!!";
    reloadBtn.classList.add("show");
    messageDiv.classList.add("winner-text");
    finished = true;
    const start = () => {
        confetti.start();
    };

    const stop = () => {
        setTimeout(function() {
            confetti.stop();
        }, 5000); // 5000 milliseconds (5 seconds) delay before stopping
    };

    start();
    stop();
};


const loser = (word) => {
    messageDiv.innerText = `LOSER! TRY ANOTHER WORD?`;
    reloadBtn.classList.add("show");
    finished = true;
}

//Call the init async function
init();
