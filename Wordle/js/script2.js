const letters = document.querySelectorAll('.letter');
const loadingDiv = document.querySelector('.loading');

let currentGuess = '';
const ANSWER_LENGTH = 5;
const GUESSES = 6;
let currentRow = 0;



async function init() {

    // const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    // const resObj = await res.json();
    // const word = resObj.word.toUpperCase();
    // const wordArray = word.split("");
    let wordArray = ["A","B","B","A","S"];
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
        if (guessArray[i] === wordArray[i]) {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        }
    } 

    for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (guessArray[i] === wordArray[i]) {
            // Do nothing
        }
        else if (wordArray.includes(guessArray[i])) {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        }
        else {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
        }
    }

    // Issue as it will mark a letter as being in the word, irrespective of number of the letters present.
    // AAAAA shows as all close but the are only two A's in ABBAS(test word for multple letters)
    
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