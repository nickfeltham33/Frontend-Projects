let total = "";
let currentInput = "";
let previousInput = "";
let operatorSelected = ""; 

// display += item.innerText;
const display = document.querySelector(".input_display");
const previous = document.querySelector(".previous_input");

const buttons = document.querySelectorAll(".calc_button").forEach(item => {
    item.addEventListener('click', event => {
        if (item.classList.contains("operator")) {
            operatorSelected = item.innerText;
            operatorValue = item.value;
            previousInput = currentInput;
            previous.innerText = `${previousInput} ${operatorSelected}`;
            currentInput = "";
            if (operatorValue === "minus") {
                total -= previousInput;
                console.log(total);
            }
            else if (operatorValue === "plus") {
                console.log("+");
                total += previousInput;
                console.log(total);
            }
            else if (operatorValue === "divide") {
                console.log("÷");
                total /= previousInput;
                console.log(total);
            }
            else if (operatorValue === "multiply") {
                console.log("×");
                total *= previousInput;
                console.log(total);
            }
        }   
        else if (item.classList.contains("clear")) {
            // total = "";
            // currentInput = "";
            // previousInput = "";
            previous.innerText = "0";
            display.innerText = "0";
        }
        else
        {
            currentInput += item.innerText;
            total = currentInput;
        }
            
    })
});



