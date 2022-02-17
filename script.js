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

let displayValue = []; //empty array set up to hold ongoing calculator values

let numberButtons = [zero, one, two, three, four, five, six, seven, eight, nine];

let operatorButtons = [divide, multiply, minus, plus, percent, exponent, squareRoot, factorial, equal];

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
    newValue = displayValue[0](displayValue[1], displayValue[2]);
    console.log(displayValue);
    console.log(newValue);
    if (displayValue.includes('%')) { //printing percentage operations to the chainDisplay
        if (isFloat(newValue)) {
            if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            }
        } else {
            if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + '! = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            }
        }
    } else if (displayValue[0] === factorize || displayValue[0] === squareRoots) { //printing operations with only one operand to the chainDisplay
        if (isFloat(newValue)) {
            if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            }
        } else {
            if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[4] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[3] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            }
        }
    } else {
        if (isFloat(newValue)) { //printing the operation sequence to the chainDisplay 
            if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[1] + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue.toFixed(2) + '</span>';
            }
        } else {
            if (chainDisplayText.innerText.length > 0) {
                chainDisplayText.innerHTML = chainDisplayText.innerText + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            } else {
                chainDisplayText.innerHTML = displayValue[1] + displayValue[3] + displayValue[2] + ' = ' + '<span id="chainDisplayBold">' + newValue + '</span>';
            }
        }
    }
    displayValue = [];
    displayText.innerText = '';
    if (isFloat(newValue)) {
        let roundedValue = newValue.toFixed(2);
        if (roundedValue.toString().length > 10) {
            displayText.innerText = newValue.toExponential(2); //handling numbers that are too large for the display
        } else {
        displayText.innerText = roundedValue;
        }
    } else {
        if (newValue.toString().length > 10) {
            displayText.innerText = newValue.toExponential(2);
        } else {
        displayText.innerText = newValue;
        }
    }
}

//Populate display when number buttons are clicked
clear.addEventListener('click', () => {
    displayText.innerText = '';
    chainDisplayText.innerText = '';
    displayValue = [];
});

backspace.addEventListener('click', () => {
    let lastIndex = displayText.innerText.length;
    displayText.innerText = displayText.innerText.substring(0, lastIndex - 1);
    console.log(Number(displayText.innerText));
})

numberButtons.forEach(button => button.addEventListener('click', () => {
    if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '+' || displayText.innerText === '-' || displayText.innerText === '^') {
        displayText.innerText = '';
    }
    if (displayText.innerText.length < 10) {
        displayText.innerText = displayText.innerText + button.innerText;
        console.log(Number(displayText.innerText));
    }
}));

decimal.addEventListener('click', () => {
    if (displayText.innerText.includes('.')) return; //only allow one decimal for each display value
    displayText.innerText = displayText.innerText + decimal.innerText;
})

//Operator populator
operatorButtons.forEach(button => button.addEventListener('click', () => {
    if (button.id === 'divide') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = divides;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = '÷';
    } else if (button.id === 'multiply') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = multiplies;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = 'x';
    } else if (button.id === 'minus') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = subtracts;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = '-';    
    } else if (button.id === 'plus') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = adds;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = '+';
    } else if (button.id ==='factorial') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = factorize;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = displayText.innerText + '!';
    } else if (button.id ==='squareRoot') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = squareRoots;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = '√' + displayText.innerText;
    } else if (button.id ==='exponent') {
        if (operatorSkip()) return;
        preEquate();
        displayValue[displayValue.length] = power;
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayText.innerText = '^';
    } else if (button.id ==='percent') {
        if (operatorSkip()) return;
        displayValue[displayValue.length] = percentage(Number(displayText.innerText));
        displayValue[displayValue.length] = Number(displayText.innerText);
        displayValue[displayValue.length] = displayValue[3] + '%';
        displayText.innerText = displayText.innerText + '%';
    } else if (button.id === 'equal') {
        if (emptyEquals()) return;
        else {
            preEquate();
        }
    }
}));

function preEquate() {
    if (displayValue.length > 0) {
        displayValue[displayValue.length] = Number(displayText.innerText);
        if (displayValue[0] === divides) { //saving the operation symbol to print in the chainDisplay
            displayValue[displayValue.length] = '÷';
        } else if (displayValue[0] === multiplies) {
            displayValue[displayValue.length] = 'x';
        } else if (displayValue[0] === subtracts) {
            displayValue[displayValue.length] = '-';
        } else if (displayValue[0] === adds) {
            displayValue[displayValue.length] = '+';
        } else if (displayValue[0] === factorize) {
            displayValue[displayValue.length] = displayValue[1] + '!';
            displayValue[displayValue.length] = '!';
        } else if (displayValue[0] === squareRoots) {
            displayValue[displayValue.length] = '√' + displayValue[1];
            displayValue[displayValue.length] = '√';
        } else if (displayValue[0] === power) {
            displayValue[displayValue.length] = '^';
        }
        operates();
    }
}

//Plus/minus button
plusMinus.addEventListener('click', () => {
    displayText.innerText = displayText.innerText * -1;
});

//Handling strange or illogical user inputs on the operator buttons
function emptyEquals() {
    if (displayValue.length === 0) {
        return true;
    } else if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '-' || displayText.innerText === '+' || displayText.innerText === '!' || displayText.innerText === '√' || displayText.innerText === '^') {
        return true;
    }
}

function operatorSkip() {   
    if (displayText.innerText === '') return true;
    else if (displayText.innerText === '÷' || displayText.innerText === 'x' || displayText.innerText === '-' || displayText.innerText === '+' || displayText.innerText === '!' || displayText.innerText === '√' || displayText.innerText === '^' || displayText.innerText === '%') {
        return true;
    }
}
