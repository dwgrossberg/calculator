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
function operates(operator, a, b) {
    return operator(a, b);
}

//Populate display when number buttons are clicked
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

let operatorButtons = [divide, multiply, minus, plus, equal]

let numberButtons = [decimal, zero, one, two, three, four, five, six, seven, eight, nine];

numberButtons.forEach(button => button.addEventListener('click', () => {
    displayText.innerText = displayText.innerText + button.innerText;
}));

clear.addEventListener('click', () => displayText.innerText = '');



