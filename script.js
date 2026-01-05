const input = document.querySelector("input");
const keys = document.querySelectorAll(".keys");
const equalKey = document.querySelector(".equalKey");
const allClear = document.querySelector(".allClear");
const clear = document.querySelector(".clear")

function operate() {
    const value = input.value;

    if (hasMultipleOperators(value)){
        input.value = "ERROR";
        return;
    }

    let operator;
    if (value.includes('+')) operator = '+';
    else if (value.includes('-')) operator = '-';
    else if (value.includes('*')) operator = '*';
    else if (value.includes('/')) operator = '/';
    else return;

    let equationPart = value.split(operator);

    let num1 = +equationPart[0];
    let num2 = +equationPart[1];

    let result;
    if (operator === '+') result = num1 + num2;
    if (operator === '-') result = num1 - num2;
    if (operator === '*') result = num1 * num2;
    if (operator === '/') {
        if (num2 === 0){
            return "ERROR";
        } else {
        result = num1 / num2;
        }
    }
    return result;
}

function hasMultipleOperators(value) {
    const operators = ["+", "-", "*", "/"];
    let count = 0;

    for (let char of value) {
        if (operators.includes(char)) {
            count++;
        }
    }
    return count > 1;
}

keys.forEach(button => {
    button.addEventListener("click", () => {
        input.value += button.textContent;
    });
});

equalKey.addEventListener("click", () => {
    const result = operate();
    if (result !== undefined) {
        input.value = result;
    }
});

allClear.addEventListener("click", () => {
    input.value = "";
});

clear.addEventListener("click", () => {
    const display = input.value;
    const newDisplay = display.slice(0, -1);
    input.value = newDisplay;
});

document.addEventListener("keydown", (event) => {
    if (event.key.length === 1) {
        input.value += event.key;
    }else if (event.key === 'Backspace'){
        input.value = input.value.slice(0, -1);
    }else if (event.key === 'Enter'){
        const result = operate();
        if (result !== undefined){
            input.value = result;
        }
    }
});