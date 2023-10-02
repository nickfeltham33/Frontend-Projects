const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
let word = "";
let row = 1;
let letterIndex = 0;
let rowIndex = 0;
let totalRows = 6;

const letters = document.querySelectorAll(".letter");
letters.forEach(letter => {
    letter.addEventListener("input", event => {
        letter.textContent = event.target.textContent;
    })
});

document.addEventListener('DOMContentLoaded', function () {
    getWord();
});

async function getWord() {
    const promise = await fetch(WORD_URL);
    const processedResponse = await promise.json();
    word = processedResponse.word;
    createRow();
}

document.getElementById("check-word")
.addEventListener("click", event => {
    if(rowIndex < totalRows) {
        createRow();
    }
});


const createRow = () => {
    // Create a new row div
    const newRow = document.createElement('div');
    newRow.className = "grid-row";
    newRow.id = `row-${rowIndex}`;
  
    // Append the new row to the parent container (e.g., where you want to add it)
    const parentContainer = document.getElementById('grid-wrap'); // Replace 'container' with the ID of the parent container
    parentContainer.appendChild(newRow);

    for (let i = 0; i < 5; i++) {
        // Create and append the input element to the new row
        const newInput = document.createElement('input');
        newInput.className = 'letter';
        newInput.id = `letter-${letterIndex}`;
        newInput.maxLength = 1;
        newRow.appendChild(newInput);
        letterIndex++;
    }
    rowIndex++; 
  }

const checkInput = () => {

}



/*

Get the word of the day and store it locally -
enable user input for the first row only.
check the first row of letters against the word.
nested for loops might do this.
first check the first letter entered byt the user.
if the first letter matches then add to an array,
maybe hava variable for each letter but this seems lengthy and not ideal.
if the letter does not match, then check the rest of the letters.
if the letter is in the word but not the specified location then something.

*/