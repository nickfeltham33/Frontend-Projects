const letters = document.querySelectorAll('.letter');
const loadingDiv = document.querySelector('.loading');

let currentGuess = '';
const ANSWER_LENGTH = 5;
const GUESSES = 6;
let currentRow = 0;


async function init() {

    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordArray = word.split("");

    isLoading = false;
    setLoading(isLoading);

    document.addEventListener("keydown", function handleKeyPress (event) {
        const action = event.key;

        if (action === 'Enter') {
            commit(wordArray);
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            // Do Nothing
        }
    });
}

const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
}

const commit = (wordArray) => {
    if (currentGuess.length !== ANSWER_LENGTH) {
        return;
    }

    guessArray = currentGuess.split("");

    for (let i = 0; i < ANSWER_LENGTH; i++) {
        // Find the index of the first occurrence of the letter in wordArray
        const firstIndex = wordArray.indexOf(guessArray[i]);
        // Check if the letter exists in wordArray
        if (firstIndex !== -1) {
          if (guessArray[i] === wordArray[i]) {
            letters[ANSWER_LENGTH * currentRow + i].classList.add('correct');
          } else if (wordArray.includes(guessArray[i])) {
            letters[firstIndex -1].classList.add('close');
            console.log("this");
          } else {
            // Do nothing
          }
        }
      }

    currentRow++;
    currentGuess = '';
}

const backspace = () => {
    currentGuess = currentGuess.substring(0,currentGuess.length - 1);
    // remove previous letter
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";

}

const addLetter = (letter) => {
    if(currentGuess.length < ANSWER_LENGTH) {
        currentGuess += letter;
    } else {
        // change last letter
        currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
}

const setLoading = (isLoading) => {
    setTimeout(() => {
        loadingDiv.classList.toggle('show', isLoading);
    },1000);
}

//Call the init async function
init();