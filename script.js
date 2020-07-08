
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

const regex = /[0-9.]+|[+-/*]/g;

let equationArray;
console.log(equationArray);

const calculateMultiplication = () => {
    for (let i = 0; i < equationArray.length; i++) {
        if (equationArray[i] === '*') {
            equationArray.splice(i-1, 3, equationArray[i-1] * equationArray[i+1])
            i--;
        }
    }
};

const calculateDivision = () => {
    for (let i = 0; i < equationArray.length; i++) {
        if (equationArray[i] === '/') {
            equationArray.splice(i-1, 3, equationArray[i-1] / equationArray[i+1])
            i--;
        }
    }
};

const calculateAddition = () => {
    for (let i = 0; i < equationArray.length; i++) {
        if (equationArray[i] === '+') {
            equationArray.splice(i-1, 3, parseInt(equationArray[i-1], 10) + parseInt(equationArray[i+1], 10));
            i--;
        }
    }
};

const calculateSubtraction = () => {
    for (let i = 0; i < equationArray.length; i++) {
        if (equationArray[i] === '-') {
            equationArray.splice(i-1, 3, equationArray[i-1] - equationArray[i+1]);
            i--;
        }
    }
};

const completeCalculation = () => {
    equationArray = display.innerHTML.match(regex);
    console.log(equationArray);
    calculateMultiplication();
    console.log(equationArray);
    calculateDivision();
    console.log(equationArray);
    calculateSubtraction();
    console.log(equationArray);
    calculateAddition();
    console.log(equationArray);
    display.innerHTML = equationArray.join("");
};


numbersArray.forEach((number) => {number.addEventListener("click", displayButton)});
numbersArray.forEach((number) => {number.addEventListener("click", consecutiveZeroCheck)});
operationsArray.forEach((element) => {element.addEventListener("click", consecutiveOperatorCheck)});
operationsArray.forEach((element) => {element.addEventListener("click", displayButton)});
operationsArray.forEach((element) => {element.addEventListener("click", setOperatorIndex)});

clear.addEventListener("click", clearDisplay);
equals.addEventListener('click', completeCalculation)
