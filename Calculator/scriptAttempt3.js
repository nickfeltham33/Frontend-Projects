let sumTotal = 0;
let currentInput = 0;
let storedInput = 0;
let activeOperator = "";

const inputDisplay = document.querySelector(".input_display");
const totalDisplay = document.querySelector(".total");

// set totals
const displayTotals = () => {
    totalDisplay.innerText = sumTotal.toString();
    inputDisplay.innerText = currentInput.toString();
}

// set current input to string


const numberButtons = document.querySelectorAll(".number").forEach(item => {
    item.addEventListener("click", event => {
        let currentNumber = currentInput.toString();
        let totalNumber = sumTotal.toString();
        if (currentNumber.charAt(0) === '0') {
            currentInput = currentNumber.slice(1);
            sumTotal = totalNumber.slice(1);
        }
        if (totalNumber.charAt(0) === '0') {
            sumTotal = totalNumber.slice(1);
        }
        currentInput += item.innerText;
        displayTotals();
    })
});

const setOperator = document.querySelectorAll(".operator").forEach(item => {
    item.addEventListener("click", event => {
        switch (item.value) {
            case "plus":
                activeOperator = item.value;
                storedInput = currentInput;
                currentInput = 0;
                add();
                break;
            case "minus":
                activeOperator = item.value;
                storedInput = currentInput;
                currentInput = 0;
                minus();
                break;
            case "multiply":
                activeOperator = item.value;
                storedInput = currentInput;
                currentInput = 0;
                multiply();
                break;
            case "divide":
                activeOperator = item.value;
                storedInput = currentInput;
                currentInput = 0;
                divide();
                break;
            default:
                activeOperator = item.value;
                sum();
        }
    })
});

const add = () => {
    sumTotal += storedInput;
    console.log(sumTotal);
}

const minus = () => {
    sumTotal -= storedInput;
    console.log(sumTotal);
}

const multiply = () => {
    sumTotal *= storedInput;
    console.log(sumTotal);
}

const divide = () => {
    sumTotal /= storedInput;
    console.log(sumTotal);
}

const sum = () => {
    console.log("sum clicked");
}

const clear = document.querySelector(".clear").addEventListener("click", event => {
    sumTotal = 0;
    currentInput = 0;
    storedInput = 0;
    activeOperator = "";
});