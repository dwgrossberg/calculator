//Variables
const display = document.getElementsByClassName('display');
const displayText = document.getElementById('displayText');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const divide = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const equal = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
let displayValue = []; //empty array set up to hold ongoing calculator values

let numberButtons = [decimal, zero, one, two, three, four, five, six, seven, eight, nine];


//Basic math operator functions
function adds(a, b) {
    return a + b;
}

function subtracts(a, b) {
    return a - b;
}

function multiplies(a, b) {
    return a * b;
}

function divides(a, b) {
    return a / b;
}

//Operate function
function operates() {
    console.log(displayValue);
    let newValue = displayValue[0](displayValue[1], displayValue[2]);
    console.log(newValue);
    displayValue = [];
    displayText.innerText = '';
    if (newValue % 2) {
        displayText.innerText = newValue;
    } else {
        displayText.innerText = newValue.toFixed(2);
}
}

//Populate display when number buttons are clicked

clear.addEventListener('click', () => {
    displayText.innerText = '';
    displayValue = [];
});

backspace.addEventListener('click', () => {
    let lastIndex = displayText.innerText.length;
    displayText.innerText = displayText.innerText.substring(0, lastIndex - 1);
    return console.log(Number(displayText.innerText));
})

numberButtons.forEach(button => button.addEventListener('click', () => {
    if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '-' || displayText.innerText === '+') {
        displayText.innerText = '';
    }
    displayText.innerText = displayText.innerText + button.innerText;
    return console.log(Number(displayText.innerText));
}));


divide.addEventListener('click', () => {
    displayValue[displayValue.length] = divides;
    displayValue[displayValue.length] = Number(displayText.innerText);
    displayText.innerText = '÷';
});

equal.addEventListener('click', () => {
    displayValue[displayValue.length] = Number(displayText.innerText);
    operates();
})