// Define variables to keep track of calculator state
let total = 0;
let currentInput = "";
let previousOperator = "";
let clearNext = false; // Flag to clear the display on the next input

// Define references to HTML elements
const display = document.querySelector(".input_display");
const totalDisplay = document.querySelector(".total");
const buttons = document.querySelectorAll(".button");
const error = document.querySelector(".error_message");
console.log(error);

// Add event listeners for the calculator buttons
buttons.forEach(button => {
    button.addEventListener("click", event => {
        // Set value to the clicked button text value
        // This can then be passed to the relevant function depending on class attached to the button.
        const value = button.innerText;

        if (button.classList.contains("number")) {
            handleNumberClick(value);
        } else if (button.classList.contains("operator")) {
            handleOperatorClick(value);
        } else if (button.classList.contains("clear")) {
            handleClearClick();
        } else if (button.classList.contains("back")) {
            handleBackClick();
        }
    });
});

// Function to handle number button clicks.
// checks the value of clearNext. 
// if it is trued then it will set the value of the current input to an empty string.
// it will then reset the clearNext back to false.
// The idea of this is that when an operator button is clicked, the clearnext to set to true.
// This means that on the next number input, the currentInput value will be cleared, before adding a new input to the dipsplay.
// function handleNumberClick(value) {

// Added a check to remove the leading 0.
// if the currentInput is just a "0" on its own, then this is removed on click.

function handleNumberClick(value) {
    if (clearNext) {
        currentInput = "";
        clearNext = false;
    }

    if (currentInput === "0") {
        currentInput = "";
    }

    currentInput += value;
    display.innerText = currentInput;
}


// Function to handle operator button clicks.
// Takes in the value of the button click, which will be an operator.
// If no operator value has been store, ei button not clicked then the total will be set to the current value.
// It needs to be converted from a string to a float value, for calculations to be performed on it.
//  The else does this, passing the required inputs to the calculator function.

function handleOperatorClick(operator) {
    if (previousOperator === "") {
        total = parseFloat(currentInput);
    } else {
        total = performCalculation(previousOperator, total, parseFloat(currentInput));
    }

    previousOperator = operator;
    clearNext = true;
    totalDisplay.innerText = total;
}

// Function to handle the clear button click.
// Resets the totals to the original values.
// It also sets the clearNext to false.
function handleClearClick() {
    total = 0;
    currentInput = "";
    previousOperator = "";
    clearNext = false;
    display.innerText = "0";
    totalDisplay.innerText = "0";
}

// Function to handle the back button click.
// Checks if the currentInput is not empty. 
// Uses slice(0,-1) to move to the end of the string provided.
// The -1 is a trick that cycles around the back of the string.
// This is easier than taking the length and iterating through to the end. 
// The slice inputs remove everything up to, but not the first input and including the second input.
// Important to note, that slice does not change the original string.
// It creates a new modified string and stores it in the chosen variable.
// This overwrites the original in this case.
function handleBackClick() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput;
    }
}

// Function to perform calculations.
// This function takes in the clicked operator, the total, and the current input value.
// The operator is used to determine the action using a switch statement.
// 
function performCalculation(operator, num1, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "×":
            return num1 * num2;
        case "÷":
            if (num2 == 0) {
                error.innerText = "Division by zero is not allowed.";
                handleClearClick();
                return 0;
            }
            return num1 / num2;
        default:
            return num2;
    }
}

/*
Error Report:

*/
