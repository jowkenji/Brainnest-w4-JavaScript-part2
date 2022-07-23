/* Basic Operations */

function operate(operator, num1, num2) {
    // call an operation with two arguments
    return operator(num1, num2);
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    // avoid to divide by zero;
    if (num2 == 0) { 
        return 'not allowed';
    } else {
        return num1 / num2;
    }
}

/* Display working */

function displayNumber(displayValue) {
    // show the current number typed
    return display.textContent = displayValue.join('');
}

function displayResult(resultado) {             
    // show the results or partials
    let resultadoStr = resultado.toString();
    if (resultadoStr == 'not allowed') {      // divide by zero case
        display.textContent = resultado;
    } else if (resultadoStr.includes('.')) {  // limit decimal results
        if (resultadoStr.length > 10) {
            display.textContent = resultadoStr.slice(0,10);
        } else {
            display.textContent = resultado;
        }
    } else if (resultadoStr.length > 9) {     // limit big number results
        let tamanho = resultadoStr.length - 5;
        if (tamanho < 9) {
            display.textContent = `${resultadoStr.slice(0, 5)}.10e${tamanho}`;
        } else {
            display.textContent = `${resultadoStr.slice(0, 4)}.10e${tamanho}`;
        }
    } else {
        display.textContent = resultado;
    }
    return display.textContent;
}

/* Buttons Functions */

function pressNumber(number) { 
    // Reads the entered number, store it in an array and display the value.
    if(displayValue[0] == 0) {  // ignore the first digit '0'
        displayValue = [];
        displayValue.push(number.textContent);
        return displayNumber(displayValue);
    } else if (displayValue.includes('.')) {  // avoid entering multiple dots
        return displayNumber(displayValue);
    } else if (displayValue.length < 9) {  // limited to 9 digit input
        displayValue.push(number.textContent);
        return displayNumber(displayValue);
    }
}

function pressNumberKey(number) { 
    // Reads the entered number by keyboard, store it in an array and display the value.
    // Similar function except: push no textContent
    if(displayValue[0] == 0) {  // ignore the first digit '0'
        displayValue = [];
        displayValue.push(number);
        return displayNumber(displayValue);
    } else if (displayValue.length < 9) {  // limited to 9 digit input
        displayValue.push(number);
        return displayNumber(displayValue);
    }
}

function pressOperator(operationBtn) {
    // Stores the entered number as argument, selects a new operator.
    // If a second argument is available, calculate a partial result.
    if (resultado!=0){
        num[0] = resultado;
    } 
            
    num.push(+displayValue.join(''));
    
    if (num.length > 1) {
        resultado = operate(operator, num[0], num[1]);
        displayResult(resultado);
        num[0] = resultado;
        num.pop();
    }
    
    switch (operationBtn.textContent) {
        case '+': operator = add;
        break;
        case '-': operator = subtract;
        break;
        case '*': operator = multiply;
        break;
        case '/': operator = divide;
        break;
    };

    displayValue = [];
    return operator;
}

function pressOperatorKey(operationBtn) { 
    // Stores the entered number as argument, selects a new operator.
    // If a second argument is available, calculate a partial result.
    // Similar function except: no textContent
    if (resultado!=0){
        num[0] = resultado;
    } 
            
    num.push(+displayValue.join(''));
    
    if (num.length > 1) {
        resultado = operate(operator, num[0], num[1]);
        displayResult(resultado);
        num[0] = resultado;
        num.pop();
    }
    
    switch (operationBtn) {
        case '+': operator = add;
        break;
        case '-': operator = subtract;
        break;
        case '*': operator = multiply;
        break;
        case '/': operator = divide;
        break;
    };

    displayValue = [];
    return operator;
}

function pressEqual() {
    // If it has a first argument, stores the entered number as the second argument.
    // Then do the operation and display the result.
    if (num.length != 0) {
        num.push(+displayValue.join(''));
        resultado = operate(operator, num[0], num[1]);
        displayResult(resultado);
        num = [];
        displayValue = [];
    }
}

function pressClear() {
    // Clear the stored arguments, operators, result and display 0.
    displayValue =[];
    num = [];
    resultado = 0;
    parcial = 0;
    operator = '';
    displayResult(resultado);
}

function pressBack() {
    // Delete the last number entered.
    if (displayValue.length < 2) {
        displayValue = [0];
        displayNumber(displayValue);
    } else {
        displayValue.pop();
        displayNumber(displayValue);
    }
}

/* Elements and variables */

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.back');
const equalBtn = document.querySelector('.equal');

let resultado = 0;
display.textContent = resultado; // initial display state.
let displayValue = [];
let operator = '';
let num = [];

/* Events */

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        pressNumber(number);
    })
})

operators.forEach((operationBtn) => {
    operationBtn.addEventListener('click', () => {
        pressOperator(operationBtn);
    })
})

equalBtn.addEventListener('click', () => {
    pressEqual();
});

clearBtn.addEventListener('click', () => {
    pressClear();
})

backBtn.addEventListener('click', () => {
    pressBack();
})

document.addEventListener('keydown', (event) => {
    let name = event.key;
    if (parseInt(name, 10)) {
        pressNumberKey(name);
    } else {
        if (name == 'Backspace') {
            pressBack();
        } else if (name == 'Escape') {
            pressClear();
        } else if (name == 'Enter') {
            pressEqual();
        } else if (name == '+' || name == '-' || name == '*' || name == '/') {
            pressOperatorKey(name);
        } else if (name == 0) {
            pressNumberKey(name);
        } else if (name == '.') {
            pressNumberKey(name);
        }
    }
})

/* To solve:
    - after equal use the result to do more operations;
*/