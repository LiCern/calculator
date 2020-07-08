
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

let operatorIndex = -1;             //set this variable at -1 to facilitate the inital use of consecutiveZeroCheck

let disableDecimal = false;         // this variable will disable the decimal button when true

const clearDisplay = () => {        //reset calculator upon hitting clear
    display.innerHTML = "0";        //reset display
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
    //in case of a division or multiplication with a negative number it just returns so to allow that operation
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
    if (display.innerHTML[operatorIndex + 1] == "0" && display.innerHTML[operatorIndex + 2] !== ".") {      //checks for number starting with 0. (excludes 0.x decimals)
        display.innerHTML = display.innerHTML.slice(0, operatorIndex + 1) + display.innerHTML.slice(-1);    //remove the zero at start of number
    }
}

const setOperatorIndex = () => {        // logs the position of most recent operator for use elsewhere
    operatorIndex = display.innerHTML.length - 1;
}

const regex = /[0-9.]+|[+-/*]/g;    //regex to match numbers OR operators 

let equationArray;  //initialise (will update upon hitting equals). This will contain the display equation broken up into array elements.

// main calculation equations

const calculateMultiplication = () => {   
    for (let i = 0; i < equationArray.length; i++) { // search for operator
        if (equationArray[i] === '*') {
            equationArray.splice(i-1, 3, equationArray[i-1] * equationArray[i+1]) // replace adjacent elements with a single element containing result
            i--;    // to ensure we dont skip an element due to splice reducing number of elements
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
            equationArray.splice(i-1, 3, parseInt(equationArray[i-1], 10) + parseInt(equationArray[i+1], 10)); //parseInt() stops concatenation
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
    equationArray = display.innerHTML.match(regex);     //use regex previously defined to get an array of alternating numbers and operators 
    console.log(equationArray);
    calculateMultiplication();
    console.log(equationArray);
    calculateDivision();
    console.log(equationArray);
    calculateSubtraction();
    console.log(equationArray);
    calculateAddition();
    console.log(equationArray);
    display.innerHTML = equationArray.join("");         //equationArray to turn into a string to be displayed as the final result
};


numbersArray.forEach((number) => {number.addEventListener("click", displayButton)});
numbersArray.forEach((number) => {number.addEventListener("click", consecutiveZeroCheck)});
operationsArray.forEach((element) => {element.addEventListener("click", consecutiveOperatorCheck)});
operationsArray.forEach((element) => {element.addEventListener("click", displayButton)});
operationsArray.forEach((element) => {element.addEventListener("click", setOperatorIndex)});

clear.addEventListener("click", clearDisplay);
equals.addEventListener('click', completeCalculation)
