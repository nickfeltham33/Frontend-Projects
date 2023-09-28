const letters = document.querySelectorAll('.letter');

let currentGuess = '';
const ANSWER_LENGTH = 5;
const GUESSES = 6;
let currentRow = 0;


async function init() {
    const res = await fetch("https://words.dev-apis.com/word-of-the-day")
    console.log(res);
    document.addEventListener("keydown", function handleKeyPress (event) {
        const action = event.key;
        console.log(action);

        if (action === 'Enter') {
            commit();
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

const commit = () => {
    console.log("commit");
    if (currentGuess.length !== ANSWER_LENGTH) {
        return;
    }

    // TO DO:
    // Validate word
    // Add markers
    // Winner or lose alerts


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

init();