//Variables
const body = document.getElementsByTagName('body');
const display = document.getElementsByClassName('display');
const displayText = document.getElementById('displayText');
const chainDisplayText = document.getElementById('chainDisplayText');
const solar = document.getElementsByClassName('solar');
const keyboard = document.getElementsByClassName('keyboard');
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

let allValues = [] //empty array to hold all new values for special case printing

let oldValue = [] //empty array for holding old calculated values to manipulate the chainDisplay with

let operatorSymbol = [] //empty array to keep track of the current operator symbol

let oldOperatorSymbol = [] //empty array to store old operation symbols for printing to the chaindDisplay

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
    if (b === 0) return NaN;
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

//Check to see whether a number is floating-point or not
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0; 
}

//whichNumber returns a formatted number (either Nan, integer, floating-point, integer exponential, or floating-point exponential)
function whichNumber(n, r) { 
    if (isNaN(n)) {
        return NaN;
    } else if (isFloat(n)) {
        if (r.toString().length > 12) {
            return n.toExponential(6); 
        } else {
            return r;
        }
    } else {
        if (n.toString().length > 12) {
            return n.toExponential(6);
        } else {
        return n;
        }
    }
}

//Operate function - prints newValue to the display as well as the operation chain to the chainDisplay
function operates() {
    let value = displayValue[0](displayValue[1], displayValue[2]);
    let roundedValue = value.toFixed(2);
    let newValue = whichNumber(value, roundedValue);
    allValues.unshift(newValue);
    let lastIndexChainDisplay = chainDisplayText.innerText.length;
    console.log('displayValue = ' + displayValue);
    console.log('newValue = ' + newValue);
    console.log('oldValue = ' + oldValue);
    console.log('allValues = ' + allValues);
    displayText.innerText = '';
    if (isNaN(newValue)) {
        displayText.innerText = 'whoops, try again';
    } else {
        displayText.innerText = newValue;
    } 
    //printing to the chainDisplay
    if (displayValue[0] === percentage) { //special case printing first operand percent operations to the chainDisplay
        if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displa
            chainDisplayText.innerHTML = chainDisplayText.innerText + '<span id="chainDisplayBold">' + displayValue[1] + '%' + '</span>';
        } else if (chainDisplayText.innerText.length > 0 ) {
            chainDisplayText.innerHTML = chainDisplayText.innerText + '%';
        } else {
            chainDisplayText.innerHTML = '<span id="chainDisplayBold">' + displayValue[1] + '%' + '</span>';
        }
    } else if (displayValue.length > 6) { //printing percentage operations with second operand as percent number to the chainDisplay
        if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displayValue    
            chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[1] + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else if (chainDisplayText.innerText.length > 0) {
            chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else {
            chainDisplayText.innerHTML = displayValue[1] + displayValue[6] + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        }
    } else if (displayValue[0] === factorize || displayValue[0] === squareRoots) { //printing operations with only one operand to the chainDisplay
        if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displayValue
            chainDisplayText.innerHTML = chainDisplayText.innerText + ' ' + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else if (chainDisplayText.innerText.length > 0 && displayValue[0] === squareRoots) { 
            chainDisplayText.innerHTML = chainDisplayText.innerText.substring(0, chainDisplayText.innerText.lastIndexOf(String(oldValue[0]))) + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else if (chainDisplayText.innerText.length > 0 && displayValue[0] === squareRoots) { //special printing conditions for squareRoot operations while the chainDisplay is in use with backspace button
            chainDisplayText.innerHTML = chainDisplayText.innerText.substring(0, chainDisplayText.innerText.indexOf(String(oldValue[0]))) + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else if (chainDisplayText.innerText.length > 0) {
            chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else {
            chainDisplayText.innerHTML = displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        }
    } else { //printing the operation sequence to the chainDisplay 
        if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) === '//') { //printing new operations to the chainDisplay after a user deletes the displayValue
            chainDisplayText.innerHTML = chainDisplayText.innerText + ' ' + displayValue[1]+ displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else if (chainDisplayText.innerText.length > 0) {
            chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        } else {
            chainDisplayText.innerHTML = displayValue[1] + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
        }
    }
    displayValue = [];
    oldValue[0] = newValue;
}

//Populate display when number buttons are clicked
clear.addEventListener('click', clearAll);

window.addEventListener('keydown', clearAll);

function clearAll(e) {
    if (e.type === 'keydown' && e.key !== 'Escape') return; 
    displayText.innerText = '';
    chainDisplayText.innerText = '';
    displayValue = [];
    oldValue = [];
    operatorSymbol = [];
    oldOperatorSymbol = [];
    allValues = [];
}

backspace.addEventListener('click', erase);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        erase();
    }
})

function erase() {
        let lastIndexDisplay = displayText.innerText.length;
        let lastIndexChainDisplay = chainDisplayText.innerText.length;
        if (displayText.innerText === '') return;
        if (chainDisplayText.innerText.length > 0 && displayValue.length === 0 && chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) !== '//' && (displayText.innerText !== '??' || displayText.innerText !== 'x' || displayText.innerText !== '+' || (displayText.innerText !== '-' || displayText.innerText !== '!' || displayText.innerText !== '^'))) { //updating the chainDisplay when the user presses backspace
            chainDisplayText.innerHTML = chainDisplayText.innerText +  ' //';  //indicates a new operation sequence after user hits backspace to change the previous result
        }
        if (displayText.innerText.substring(displayText.innerText.length -1) === '??' || displayText.innerText.substring(displayText.innerText.length -1) === 'x' || displayText.innerText.substring(displayText.innerText.length -1) === '+' || displayText.innerText.substring(displayText.innerText.length -1) === '-' || displayText.innerText.substring(displayText.innerText.length -1) === '^' || displayText.innerText.substring(displayText.innerText.length -1) === '!' || displayText.innerText.substring(displayText.innerText.length -1) === '%') {
            displayValue = [];
            displayText.innerText = displayText.innerText.substring(0, lastIndexDisplay - 1);
        } else if (displayText.innerText.includes('???')) {
            displayValue = [];
            displayText.innerText = displayText.innerText.substring(1, lastIndexDisplay);
        } else {    
            displayText.innerText = displayText.innerText.substring(0, lastIndexDisplay - 1);
        }
}

numberButtons.forEach(button => button.addEventListener('click', insertNumber));

window.addEventListener('keydown', insertNumber);

function insertNumber(e) {
    let num;
    if (e.type === 'keydown' && !(e.key >= 0 && e.key <= 9)) return; 
    if (e.type === 'keydown') {
        num = e.key;
    } else if (e.type === 'click') {
        num = e.target.innerText;
    }
    if (displayText.innerText.includes('!') || displayText.innerText.includes('%')) {
        return; //special case so as not to print extra numbers after factorial symbol
    } else if (displayText.innerText.includes('???')) return;
    if (displayText.innerText.length < 12) {
        displayText.innerText = displayText.innerText + num;
    }
}


decimal.addEventListener('click', addDecimal);

window.addEventListener('keydown', addDecimal);

function addDecimal(e) {
    let dec;
    if (e.type === 'keydown' && e.key !== '.') return; 
    if (e.type === 'keydown') {
        dec = e.key;
    } else if (e.type === 'click') {
        dec = e.target.innerText;
    }
    let operatorIndex = displayText.innerText.lastIndexOf(operatorSymbol[0]);   
    if (displayText.innerText.includes(operatorSymbol[0])) {
        if (displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length).includes('.')) {
            return;
        } else if (displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length) > 0) {
            displayText.innerText = displayText.innerText + dec;
        } else {
            displayText.innerText = displayText.innerText + 0 + dec;
        }
    } else if (displayText.innerText.includes('.')) return;
    else if (displayText.innerText.length > 0) {
        displayText.innerText = displayText.innerText + dec;
    } else {
        displayText.innerText = 0 + dec;
    }
}

plusMinus.addEventListener('click', positiveNegative);

window.addEventListener('keydown', positiveNegative);

function positiveNegative(e) {
    if (operatorSkip()) return;
    if (e.type === 'keydown' && e.key !== '`') return;
    else if (displayText.innerText.includes('???')) return;
    if (operatorSymbol[0] === '-' && displayText.innerText.includes(operatorSymbol[0]) && displayText.innerText.substring(0, 1) === '-') {
        let operatorIndex = displayText.innerText.indexOf(operatorSymbol[0], 1);
        let secondOperand = displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length);
        console.log(secondOperand);
        displayText.innerText = displayText.innerText.substring(0, operatorIndex + 1) + (secondOperand * -1);
    } else if (operatorSymbol[0] === '-' && displayText.innerText.includes(operatorSymbol[0])) {
        let operatorIndex = displayText.innerText.indexOf(operatorSymbol[0]);
        let secondOperand = displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length);
        displayText.innerText = displayText.innerText.substring(0, operatorIndex + 1) + (secondOperand * -1);
    } else if (displayText.innerText.includes(operatorSymbol[0])) {
        let operatorIndex = displayText.innerText.lastIndexOf(operatorSymbol[0]);
        let secondOperand = displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length);
        displayText.innerText = displayText.innerText.substring(0, operatorIndex + 1) + (secondOperand * -1);
    } else {
        displayText.innerText = displayText.innerText * -1;
    }
    let lastIndexChainDisplay = chainDisplayText.innerText.length;
    if (chainDisplayText.innerText.substring(lastIndexChainDisplay - 2, lastIndexChainDisplay) !== '//' && chainDisplayText.innerText.length > 0 && !operatorSymbol[0]) {
        chainDisplayText.innerHTML = chainDisplayText.innerText + '*-1 = ' + '<span id="chainDisplayBold">' + displayText.innerText + '</span>';
        
    }       
}

//Handling strange or illogical user inputs on the operator buttons
function operatorSkip() {   
    if (displayText.innerText === '' && displayValue[1]) return false;
    if (displayText.innerText === '') return true;
    else if (displayText.innerText.substring(displayText.innerText.length - 1) === '??' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '!' || displayText.innerText.includes('???') || displayText.innerText.substring(displayText.innerText.length - 1) === '^' || (displayText.innerText.substring(displayText.innerText.length - 1) === '%' && displayValue[0] === Number)) {
        return true;
    }
}

//Operator populator
operatorButtons.forEach(button => button.addEventListener('click', inputOperator));

window.addEventListener('keydown', inputOperator);    
    
function inputOperator(e) {
    let operation;
    let operator;
    if (e.type === 'keydown' && !(e.key === '/' || e.key === 'x' || e.key === '-' || e.key === '=' || e.key === 'Enter' || e.key === '!' || e.key === '%' || e.key === '^' || e.key === ')')) {
        return;
    } else if (e.type === 'keydown') {
        console.log(e.key);
        operation = e.key;
    } else if (e.type === 'click') {
        operation = e.target.id;
    } 
    if (operation === 'plusMinus') return;
    if (displayText.innerText === 'whoops, try again') return;
    if (operation === 'divide' || operation === '/') {
        operator = divides;
        operatorSymbol = '??';
        oldOperatorSymbol[0] = '??';
    } else if (operation === 'multiply' || operation === 'x') {
        operator = multiplies;
        operatorSymbol = 'x';   
        oldOperatorSymbol[0] = 'x';
    } else if (operation === 'minus' || operation === '-') {
        operator = subtracts;
        operatorSymbol = '-';
        oldOperatorSymbol[0] = '-';
    } else if (operation === 'plus' || operation === '=') {
        operator = adds;
        operatorSymbol = '+';
        oldOperatorSymbol[0] = '+';
    } else if (operation === 'exponent' || (e.shiftKey && operation === '^')) {
        operator = power;
        operatorSymbol = '^';
        oldOperatorSymbol[0] = '^';
    }
    if (displayText.innerText === '' || displayText.innerText.substring(-1) === operatorSymbol[0]) return;
    if (operation === 'equal' || operation === 'Enter') {
        if (displayValue.length === 0) return;
        else if (displayText.innerText.substring(displayText.innerText.length - 1) === '??' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^') {
            return;
        } else preEquate();
        operatorSymbol = [];
    } else if (operation === 'squareRoot' || (operation === ')' && e.shiftKey)) { //special conditions for changing an operator to the square root symbol
        if (displayText.innerText === '???whoops, try again') {
            displayText.innerText = 'whoops, try again';
            return;
        }
        oldOperatorSymbol[0] = '???';
        if (displayText.innerText.substring(displayText.innerText.length - 1) === '??' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^' || displayText.innerText.substring(displayText.innerText.length - 1) === '!') {
            displayValue = [];
            displayText.innerText = '???' + displayText.innerText.substring(0, displayText.innerText.length - 1);
            displayValue[0] = squareRoots;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(1, displayText.innerText.length));
        } else {                            
            preEquate();
            displayValue[0] = squareRoots;
            displayValue[displayValue.length] = Number(displayText.innerText);
            displayText.innerText = '???' + displayText.innerText;
        }
    } else if (operation === 'factorial' || (operation === '!' && e.shiftKey)) { //special conditions for using factorial operator
        oldOperatorSymbol[0] = '!';
        if (displayText.innerText.substring(0, 1) === '???') { 
            displayValue = [];
            displayText.innerText = displayText.innerText.substring(1, displayText.innerText.length) + '!';
            displayValue[0] = factorize;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
        } else if (displayText.innerText.substring(displayText.innerText.length - 1) === '??' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^') {
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
    } else if (operation === 'percent' || (operation === '%' && e.shiftKey)) { //special conditions for using the percent operator
        let operatorIndex = displayText.innerText.lastIndexOf(operatorSymbol[0]);
        console.log(displayText.innerText.substring(displayText.innerText.length - 1));
        console.log(operatorSymbol[0]);
        if (displayText.innerText.substring(displayText.innerText.length - 1) === operatorSymbol[0] || displayText.innerText.substring(displayText.innerText.length - 1) === '!' || displayText.innerText.substring(displayText.innerText.length - 1) === '%') {
            return;
        } else if (displayText.innerText.substring(0, 1) === '???') {
            displayValue[1] = percentage(displayText.innerText.substring(1, displayText.innerText.length));
            displayText.innerText = displayText.innerText + '%';
        } else if (displayValue[0] && displayValue[0] !== percentage) { //setting the second operand as a percent
            displayValue[2] = percentage(Number(displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length)));
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operatorIndex + 1, displayText.innerText.length));
            displayValue[displayValue.length] = displayValue[3] + '%';
            displayText.innerText = displayText.innerText + '%';
        } else { //setting the first operand as a percent
            displayValue[0] = percentage;
            displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length));
            displayText.innerText = displayText.innerText + '%';
        }               
    } else if (displayText.innerText.substring(0, 1) === '???') { //special conditions for changing the square root symbol to another operator
        displayValue = [];
        displayText.innerText = displayText.innerText.substring(1, displayText.innerText.length) + operatorSymbol[0];
        displayValue[0] = operator;
        displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
    } else if (displayText.innerText.substring(displayText.innerText.length - 1) === '??' || displayText.innerText.substring(displayText.innerText.length - 1) === 'x' || displayText.innerText.substring(displayText.innerText.length - 1) === '-' || displayText.innerText.substring(displayText.innerText.length - 1) === '+' || displayText.innerText.substring(displayText.innerText.length - 1) === '^' || displayText.innerText.substring(displayText.innerText.length - 1) === '!') {
        displayValue = [];
        displayText.innerText = displayText.innerText.substring(0, displayText.innerText.length - 1) + operatorSymbol[0];
        displayValue[0] = operator;
        displayValue[displayValue.length] = Number(displayText.innerText.substring(0, displayText.innerText.length - 1));
    } else {
        preEquate();
        displayValue[0] = operator;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = displayText.innerText + operatorSymbol[0];
    }
}

function preEquate() {
    if (displayValue[0]) {
        if (displayValue[0] === divides) { //saving the operation symbol to print in the chainDisplay
            let operator = displayText.innerText.lastIndexOf('??');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = '??';
        } else if (displayValue[0] === multiplies) {
            let operator = displayText.innerText.lastIndexOf('x');
            displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
            displayValue[displayValue.length] = 'x';
        } else if (displayValue[0] === subtracts) {
            if (displayText.innerText.substring(0, 1) === '-') {
                let operator = displayText.innerText.lastIndexOf('-');
                displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
                displayValue[displayValue.length] = '-';
            } else {
                operator = displayText.innerText.indexOf('-');
                displayValue[displayValue.length] = Number(displayText.innerText.substring(operator + 1, displayText.innerText.length));
                displayValue[displayValue.length] = '-';
            }
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
            displayValue[displayValue.length] = '???' + displayValue[1];
            displayValue[displayValue.length] = '???'; //special case for displaying single operand
        }
        operates();
    }
}

//Keyboard control pop-up
window.addEventListener('click', (e) => {
    document.body.classList.remove('keyboard');
    keyboard[1].setAttribute('id', 'keyboardHidden');
    keyboard[0].classList.remove('keyboardActive');
    keyboard[1].classList.remove('keyboardActive');
});

window.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('keyboard')) {
        document.body.classList.remove('keyboard');
        keyboard[1].setAttribute('id', 'keyboardHidden');
        keyboard[0].classList.remove('keyboardActive');
        keyboard[1].classList.remove('keyboardActive');
    } else {
        if (e.key === '.' || e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '`' || e.key === '!' || e.key === '%' || e.key === '^' || e.key === ')' || e.key === '-' || e.key === '=' || e.key === '/' || e.key === 'x' || e.key === 'Enter' || e.key === 'Escape' || e.key === 'Backspace' || e.key === 'Shift') {
            return;
        } else {
            document.body.classList.add('keyboard');
            keyboard[2].removeAttribute('id');
            keyboard[1].classList.add('keyboardActive');
            keyboard[2].classList.add('keyboardActive');
        }
    }
}); 

