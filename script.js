
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const zero = document.getElementById('zero');
const decimal = document.getElementById('decimal'); 
const numbersArray = [one, two, three, four, five, six, seven, eight, nine, zero, decimal];


const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const operationsArray = [multiply, divide, subtract, add];

const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

let display = document.getElementById('display');

let operatorIndex = -1;

let disableDecimal = false; 

const clearDisplay = () => {
    display.innerHTML = "0";
    disableDecimal = false;
}

const displayButton = (event) => {
    if (disableDecimal === true && event.target === decimal) {
        return;
    }
    if (operationsArray.includes(event.target)) {
        disableDecimal = false;
    }
    if (event.target === decimal) {
        disableDecimal = true;
    }
    display.innerHTML += event.target.innerHTML;
}

const consecutiveOperatorCheck = () => {
    if (event.target === subtract && (display.innerHTML.endsWith('/') || display.innerHTML.endsWith('*'))) {
        return;
    }
    else if (display.innerHTML.endsWith('+') || 
    display.innerHTML.endsWith('-') || 
    display.innerHTML.endsWith('/') || 
    display.innerHTML.endsWith('*')) {
        while (display.innerHTML.endsWith('+') || 
        display.innerHTML.endsWith('-') || 
        display.innerHTML.endsWith('/') || 
        display.innerHTML.endsWith('*')) {
            display.innerHTML = display.innerHTML.slice(0, -1);
        }
    }
}

const consecutiveZeroCheck = () => {
    if (display.innerHTML[operatorIndex + 1] == "0" && display.innerHTML[operatorIndex + 2] !== ".") {
        console.log('hi');
        display.innerHTML = display.innerHTML.slice(0, operatorIndex + 1) + display.innerHTML.slice(-1);
    }
}

const setOperatorIndex = () => {
    operatorIndex = display.innerHTML.length - 1;
}






numbersArray.forEach((number) => {number.addEventListener("click", displayButton)});
numbersArray.forEach((number) => {number.addEventListener("click", consecutiveZeroCheck)});
operationsArray.forEach((element) => {element.addEventListener("click", consecutiveOperatorCheck)});
operationsArray.forEach((element) => {element.addEventListener("click", displayButton)});
operationsArray.forEach((element) => {element.addEventListener("click", setOperatorIndex)});
clear.addEventListener("click", clearDisplay);
