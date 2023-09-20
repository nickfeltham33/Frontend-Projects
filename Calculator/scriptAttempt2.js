let total = 0;
let currentInput = "0"; // Initialize currentInput with "0" to handle the initial zero
let previousOperator = "";

const display = document.querySelector(".input_display");
const totalDisplay = document.querySelector(".total");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numbers.forEach(item => {
    item.addEventListener("click", event => {
        if (currentInput === "0" || previousOperator === "=") {
            currentInput = item.innerText;
        } else {
            currentInput += item.innerText;
        }
        display.innerText = currentInput;
        previousOperator = "";
    });
});

operators.forEach(item => {
    item.addEventListener("click", event => {
        if (previousOperator === "=") {
            total = parseFloat(currentInput);
        } else {
            switch (item.value) {
                case "plus":
                    total += parseFloat(currentInput);
                    break;
                case "minus":
                    total -= parseFloat(currentInput);
                    break;
                case "multiply":
                    total *= parseFloat(currentInput);
                    break;
                case "divide":
                    total /= parseFloat(currentInput);
                    break;
            }
        }
        
        totalDisplay.innerText = total;
        display.innerText = total.toString();
        currentInput = "0";
        previousOperator = item.value;
    });
});

const clear = document.querySelector(".clear").addEventListener("click", event => {
    total = 0;
    currentInput = "0";
    display.innerText = "0";
    totalDisplay.innerText = "0";
    previousOperator = "";
});
