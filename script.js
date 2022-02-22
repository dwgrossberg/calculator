//Variables
const display = document.getElementsByClassName('display');
const displayText = document.getElementById('displayText');
const chainDisplayText = document.getElementById('chainDisplayText');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const divide = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const equal = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const zero = document.getElementById('zero');
const doubleZero = document.getElementById('doubleZero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const plusMinus = document.getElementById('plusMinus');
const percent = document.getElementById('percent');
const exponent = document.getElementById('exponent');
const squareRoot = document.getElementById('squareRoot');
const factorial = document.getElementById('factorial');

const numberButtons = [doubleZero, zero, one, two, three, four, five, six, seven, eight, nine];

const operatorButtons = [divide, multiply, minus, plus, percent, exponent, squareRoot, factorial, equal];

let displayValue = []; //empty array set up to hold ongoing calculator values

let oldValue = [] //empty array for holding old calculated values to manipulate the chainDisplay with

let lastDisplayValue = [] //empty array for calling back a number after hitting backspace on an operation key

let oldOperatorSymbol = [] //empty array to store old operation symbols 

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

function factorize(n) {
  let result = 1;
  if (n === 0 || n === 1)
    return result;
  for (let i = 2; i <= n; i++){
    result = result * i;
  }
  return result;
}

function squareRoots(x) {
    return Math.sqrt(x);
}

function power(a, b) {
    return Math.pow(a, b);
}

function percentage(x) {
    return (x / 100);
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0; //check to see whether number is floating point or not
}

//Operate function
function operates() {
    let newValue = displayValue[0](displayValue[1], displayValue[2]);
    let roundedValue = newValue.toFixed(2);
    let lastIndexChainDisplay = chainDisplayText.innerText.length;
    console.log('displayValue = ' + displayValue);
    console.log('newValue = ' + newValue);
    console.log('oldValue = ' + oldValue);
    if (displayValue[0] === percentage) { //special case printing first operand percent operations to the chainDisplay
        if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displa
            chainDisplayText.innerHTML = chainDisplayText.innerText + '<span id="chainDisplayBold">' + displayValue[1] + '%' + '</span>';
        } else {
            chainDisplayText.innerHTML = '<span id="chainDisplayBold">' + displayValue[1] + '%' + '</span>';
        }
    } else if (displayValue.length > 6) { //printing percentage operations with second operand as percent number to the chainDisplay
        if (isFloat(newValue)) {
            if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displayValue
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[1] + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[1] + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            }
        } else {
            if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { 
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[1] + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText  + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[1] + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            }
        }
    } else if (displayValue[0] === factorize || displayValue[0] === squareRoots) { //printing operations with only one operand to the chainDisplay
        if (isFloat(newValue)) {
            console.log(chainDisplayText.innerText.substring(0, chainDisplayText.innerText.indexOf(String(newValue.toFixed(2)))))
            if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displayValue
                chainDisplayText.innerHTML = chainDisplayText.innerText + ' ' + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else if (chainDisplayText.innerText.length > 0 && displayValue[0] === squareRoots) { //special printing conditions for squareRoot operations while the chainDisplay is in use with backspace button
                chainDisplayText.innerHTML = chainDisplayText.innerText.substring(0, chainDisplayText.innerText.indexOf(String(oldValue[0]))) + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            }
        } else {
            if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') {
                chainDisplayText.innerHTML = chainDisplayText.innerText + ' ' + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else if (chainDisplayText.innerText.length > 0 && displayValue[0] === squareRoots) { //special printing conditions for squareRoot operations while the chainDisplay is in use
                chainDisplayText.innerHTML = chainDisplayText.innerText.substring(0, chainDisplayText.innerText.indexOf(String(oldValue[0]))) + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            }
        }
    } else {
        if (isFloat(newValue)) { //printing the operation sequence to the chainDisplay 
            if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displayValue
                chainDisplayText.innerHTML = chainDisplayText.innerText + ' ' + displayValue[1]+ displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[1] + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            }
        } else {
            if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') {
                chainDisplayText.innerHTML = chainDisplayText.innerText + ' ' + displayValue[1]+ displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[1] + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            }
        }
    }
    displayValue = [];
    displayText.innerText = '';
    if (isNaN(newValue)) {
        displayText.innerText = 'whoops, try again';
    } else if (isFloat(newValue)) {
        if (roundedValue.toString().length > 12) {
            displayText.innerText = newValue.toExponential(2); //handling numbers that are too large for the display
            oldValue[0] = newValue.toExponential(2);
        } else {
        displayText.innerText = roundedValue;
        oldValue[0] = roundedValue;
        }
    } else {
        if (newValue.toString().length > 12) {
            displayText.innerText = newValue.toExponential(2);
            oldValue[0] = newValue.toExponential(2);
        } else {
        displayText.innerText = newValue;
        oldValue[0] = newValue;
        }
    }
}

//Populate display when number buttons are clicked
clear.addEventListener('click', () => clearText());

function clearText() {
    displayText.innerText = '';
    chainDisplayText.innerText = '';
    displayValue = [];
}

backspace.addEventListener('click', () => {
    let lastIndexDisplay = displayText.innerText.length;
    let lastIndexChainDisplay = chainDisplayText.innerText.length;
    console.log('lastDisplayValue = ' + lastDisplayValue);
    if (displayText.innerText === '') return;
    if (chainDisplayText.innerText.length > 0 && displayValue.length === 0 && chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) !== '//' && (displayText.innerText !== '÷' || displayText.innerText !== 'x' || displayText.innerText !== '+' || (displayText.innerText !== '-' || displayText.innerText !== '!' || displayText.innerText !== '^'))) { //updating the chainDisplay when the user presses backspace
        chainDisplayText.innerHTML = chainDisplayText.innerText +  ' //';  //indicates a new operation sequence after user hits backspace to change the previous result
    }
    if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '+' || (displayText.innerText === '-' && displayValue.length > 0) || displayText.innerText === '^') {
        displayValue = [];
        if (chainDisplayText.innerText.length > 0) {
            displayText.innerText = oldValue[0];
        } else {
            displayText.innerText = lastDisplayValue[0];
        }
    } else if (displayText.innerText.includes('%'))  {
        if (displayValue[0] === percentage) {
            displayValue = [];
        } else {
            displayValue[2], displayValue[4] = displayValue[3]; //sets up printing to the chainDisplay
        }
        displayText.innerText = displayText.innerText.substring(0, lastIndexDisplay - 1);
    } else if (displayText.innerText.includes('!')) {
        displayValue = [];
   
   
    } else if (displayText.innerText.includes('√')) {
        displayValue = [];


    } else {    
        displayText.innerText = displayText.innerText.substring(0, lastIndexDisplay - 1);
        lastDisplayValue[0] = Number(displayText.innerText);
        console.log('displayOutput = ' + Number(displayText.innerText));
    }
});

numberButtons.forEach(button => button.addEventListener('click', () => {
    if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '+' || displayText.innerText === '-' || displayText.innerText === '^') {
        displayText.innerText = '';
    } else if (displayText.innerText.includes('!') || displayText.innerText.includes('%')) {
        return; //special case so as not to print extra numbers after factorial symbol
    } else if (displayText.innerText.includes('√')) return;
    if (displayText.innerText.length < 12) {
        displayText.innerText = displayText.innerText + button.innerText;
        lastDisplayValue[0] = Number(displayText.innerText);
    }
}));

decimal.addEventListener('click', () => {
    if (displayText.innerText.includes('.')) return; //only allow one decimal for each display value
    if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '+' || displayText.innerText === '-' || displayText.innerText === '^') {
        displayText.innerText = '';
    }
    if (displayText.innerText.length > 0) {
        displayText.innerText = displayText.innerText + decimal.innerText;
    } else {
        displayText.innerText = 0 + decimal.innerText;
    }
})

//Operator populator
operatorButtons.forEach(button => button.addEventListener('click', () => {
    let operator;
    let operatorSymbol;
    if (button.id === 'divide') {
        operator = divides;
        operatorSymbol = '÷';
        oldOperatorSymbol[0] = '÷';
    } else if (button.id === 'multiply') {
        operator = multiplies;
        operatorSymbol = 'x';   
        oldOperatorSymbol[0] = 'x';
    } else if (button.id === 'minus') {
        operator = subtracts;
        operatorSymbol = '-';
        oldOperatorSymbol[0] = '-';
    } else if (button.id === 'plus') {
        operator = adds;
        operatorSymbol = '+';
        oldOperatorSymbol[0] = '+';
    } else if (button.id === 'exponent') {
        operator = power;
        operatorSymbol = '^';
        oldOperatorSymbol[0] = '^';
    }
    if (displayText.innerText === '' || displayText.innerText.substring(-1) === operatorSymbol) return;
    if (button.id === 'equal') {
        if (displayValue.length === 0) return;
        else preEquate();
    } else if (button.id === 'squareRoot') { //special conditions for changing an operator to the square root symbol
        oldOperatorSymbol[0] = '√';
        if (displayText.innerText.substring(displayText.innerText.length - 1) === '÷' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^' || displayText.innerText.substring(displayText.innerText.length - 1) === '!') {
            displayValue = [];
            displayText.innerText = '√' + displayText.innerText.substring(0, displayText.innerText.length - 1);
            displayValue[0] = squareRoots;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(1, displayText.innerText.length));
        } else {                            
            preEquate();
            displayValue[0] = squareRoots;
            displayValue[displayValue.length] = Number(displayText.innerText);
            displayText.innerText = '√' + displayText.innerText;
        }
    } else if (button.id === 'factorial') { //special conditions for using factoril operator
        oldOperatorSymbol[0] = '!';
        if (displayText.innerText.substring(0, 1) === '√') { 
            displayValue = [];
            displayText.innerText = displayText.innerText.substring(1, displayText.innerText.length) + '!';
            displayValue[0] = factorize;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
        } else if (displayText.innerText.substring(displayText.innerText.length - 1) === '÷' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^') {
            displayValue = [];
            displayText.innerText = displayText.innerText.substring(0, displayText.innerText.length - 1) + '!';
            displayValue[0] = factorize;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
        } else {
            preEquate();
            displayValue[0] = factorize;
            displayValue[displayValue.length] = Number(displayText.innerText);
            displayText.innerText = displayText.innerText + '!';
          }
    } else if (button.id === 'percent') { //special conditions for using the percent operator
        if (displayText.innerText.substring(0, 1) === '√') {
            displayValue[1] = percentage(displayText.innerText.substring(1, displayText.innerText.length));
            displayText.innerText = displayText.innerText + '%';
        } else if (displayValue[0] && displayValue[0] !== percentage) { //setting the second operand as a percent
            let operatorIndex = displayText.innerText.lastIndexOf(oldOperatorSymbol[0]);
            displayValue[2] = percentage(Number(displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length)));
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length));
            displayValue[displayValue.length] = displayValue[3] + '%';
            displayText.innerText = displayText.innerText + '%';
            //preEquate();
        } else { //setting the first operand as a percent
            displayValue[0] = percentage;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length));
            displayText.innerText = displayText.innerText + '%';
        }               
    } else if (displayText.innerText.substring(0, 1) === '√') { //special conditions for changing the square root symbol to another operator
        displayValue = [];
        displayText.innerText = displayText.innerText.substring(1, displayText.innerText.length) + operatorSymbol;
        displayValue[0] = operator;
        displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
    } else if (displayText.innerText.substring(displayText.innerText.length - 1) === '÷' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^' || displayText.innerText.substring(displayText.innerText.length - 1) === '!') {
        displayValue = [];
        displayText.innerText = displayText.innerText.substring(0, displayText.innerText.length - 1) + operatorSymbol;
        displayValue[0] = operator;
        displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
    } else {
        preEquate();
        displayValue[0] = operator;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = displayText.innerText + operatorSymbol;
    }
}));
     
function preEquate() {
    if (displayValue[0]) {
        if (displayValue[0] === divides) { //saving the operation symbol to print in the chainDisplay
            let operator = displayText.innerText.lastIndexOf('÷');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = '÷';
        } else if (displayValue[0] === multiplies) {
            let operator = displayText.innerText.lastIndexOf('x');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = 'x';
        } else if (displayValue[0] === subtracts) {
            let operator = displayText.innerText.lastIndexOf('-');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = '-';
        } else if (displayValue[0] === adds) {
            let operator = displayText.innerText.lastIndexOf('+');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = '+';
        } else if (displayValue[0] === power) {
            let operator = displayText.innerText.lastIndexOf('^');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = '^';
        } else if (displayValue[0] === factorize) {
            displayValue[displayValue.length] = displayValue[1] + '!';
            displayValue[displayValue.length] = '!'; //special case for displaying single operand
        } else if (displayValue[0] === squareRoots) {
            displayValue[displayValue.length] = '√' + displayValue[1];
            displayValue[displayValue.length] = '√'; //special case for displaying single operand
        }
        operates();
    }
}

//Plus/minus button
plusMinus.addEventListener('click', () => {
    if (operatorSkip()) return;
    else if (displayText.innerText.includes('√')) return;
    displayText.innerText = displayText.innerText * -1;
    let lastIndexChainDisplay = chainDisplayText.innerText.length;
    if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) !== '//' && chainDisplayText.innerText.length > 0) {
        chainDisplayText.innerHTML = chainDisplayText.innerText + 'x-1 = ' + displayText.innerText;
    }
});

//Handling strange or illogical user inputs on the operator buttons
function operatorSkip() {   
    if (displayText.innerText === '' && displayValue[1]) return false;
    if (displayText.innerText === '') return true;
    else if (displayText.innerText.substring(displayText.innerText.length - 1) === '÷' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '!' || displayText.innerText.includes('√') || displayText.innerText.substring(displayText.innerText.length - 1) === '^' || (displayText.innerText.substring(displayText.innerText.length - 1) === '%' && displayValue[0] === Number)) {
        return true;
    }
}
