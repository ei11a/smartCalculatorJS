"use strict";

const binary = new Set(['+', '-', '*', '/', '^', '%', '(', ')']);
const functions = new Set(['s', 'c', 't', 'a', 'l']);

const priority = new Map([
  ['+', 1], ['-', 1], ['*', 2],
  ['/', 2], ['%', 2], ['^', 3],
  ['~', 0], ['s', 4], ['n', 4],
  ['g', 4], ['q', 4], ['r', 4],
  ['o', 4], ['a', 4], ['c', 4],
  ['t', 4]
]);

const binar = new Map([
  ['+', (a, b) => { return a + b; }],
  ['-', (a, b) => { return b - a; }],
  ['*', (a, b) => { return a * b; }],
  ['/', (a, b) => { return b / a; }],
  ['^', (a, b) => { return Math.pow(b, a); }],
  ['%', (a, b) => { return b % a; }]
]);

const unar = new Map([
  ['s', Math.sin],
  ['c', Math.cos],
  ['t', Math.tan],
  ['r', Math.asin],
  ['o', Math.acos],
  ['a', Math.atan],
  ['g', Math.log],
  ['n', Math.log10],
  ['q', Math.sqrt],
  ['~', (a) => { return a *= -1 }]
]);

const digits = new RegExp("^\\(*((\\d+\\.?\\d*)|x)\\)*");

const operators = new RegExp("^[\\*\\+\\-/\\^%]\\(*");

const functs = new RegExp("^(log|ln|sin|cos|tan|acos|asin|atan|sqrt)\\(");

let DataExp = {
  numbers: [],
  symbols: [],
  digits: []
}

CreateEvents();

function CreateEvents() {
  for (let i = 0; i < document.getElementsByClassName('CalcButton').length; i++) {
    document.getElementsByClassName('CalcButton')[i].onclick = function () {
      let buttonValue = document.getElementsByClassName('CalcButton')[i];
      switch (buttonValue.textContent) {
        case '=':
          debugger;
          let str = document.getElementById('display-input').value;
          console.log(ValidateString(str));

          // if ( document.getElementById('display-input').value = "Incorrect Input";
          // else document.getElementById('display-input').value = Calculation();
          
          delete DataExp.numbers;
          break;
        case 'graph':
          console.log('graph buttons');
          break;
        case '←':
          document.getElementById('display-input').value = document.getElementById('display-input').value.slice(0, -1);
          break;
        case 'C':
          document.getElementById('display-input').value = '';
          break;
        default:
          document.getElementById('display-input').value += buttonValue.textContent;
      }
    }
  }
}

function Parser() {
  let inputValue = document.getElementById('display-input').value;
  PolishNotation(inputValue);
}

function PolishNotation(str) {
  debugger;

  let expression = str.split('');

  for (let index = 0; index < expression.length;) {

    if (binary.has(expression[index])) {

      if (CheckUnarMinus && expression[index] == '-') DataExp.symbols.push('~');
      else AddSymbols(expression[index]);

      index++;

    } else if (functions.has(expression[index])) {

      index += AddFunction(expression[index], index, expression);
      console.log(index);

    } else if (!isNaN(parseFloat(expression[index]))) {
      let numder = ConcatArrayElements(index, expression);
      DataExp.numbers.push(numder);
      index += numder.length;
    }
  }

  PushRemains();

}

function PushRemains() {
  while (DataExp.symbols.length > 0) {
    DataExp.numbers.push(DataExp.symbols[DataExp.symbols.length - 1])
    DataExp.symbols.pop();
  }
}

function ConcatArrayElements(index, expression) {
  let numberTokens = [];
  expression = expression.slice(index, expression.length);
  for (let index in expression) {
    if (!isNaN(parseFloat(expression[index])) || expression[index] == '.') numberTokens.push(expression[index]);
    else break;
  }
  return numberTokens.join('');
}

function CheckUnarMinus(expression) {
  for (let index = 0; index < expression.length; ++index) {
    if (expression[index - 1] == '(' || DataExp.numbers.length == 0) return true;
    else return false;
  }
}

function AddSymbols(operator) {
  if (operator == '(') {

    DataExp.symbols.push(operator);

  } else if (operator == ')') {

    while (DataExp.symbols.length > 0 && DataExp.symbols[DataExp.symbols.length - 1] != '(') {
      DataExp.numbers.push(DataExp.symbols[DataExp.symbols.length - 1]);
      DataExp.symbols.pop();
    }

    DataExp.symbols.pop();

  } else if (DataExp.symbols.length == 0 ||
    priority.get(DataExp.symbols[DataExp.symbols.length - 1]) < priority.get(operator)) {

    DataExp.symbols.push(operator);

  } else {

    while (DataExp.symbols.length > 0 &&
      (priority.get(DataExp.symbols[DataExp.symbols.length - 1]) >= priority.get(operator))) {

      DataExp.numbers.push(DataExp.symbols[DataExp.symbols.length - 1])
      DataExp.symbols.pop();

    }

    DataExp.symbols.push(operator);

  }
}

function AddFunction(func, index, expression) {
  expression = expression.slice(index, expression.length);
  let step = 0;
  switch (func) {
    case 'l':

      if (/ln/.test(expression)) {
        DataExp.symbols.push('n');
        step = 2;
      } else if (/log/.test(expression)) {
        DataExp.symbols.push('g');
        step = 3;
      }
      break;

    case 'a':

      if (/asin/.test(expression)) DataExp.symbols.push('r');
      else if (/acos/.test(expression)) DataExp.symbols.push('o');
      else if (/atan/.test(expression)) DataExp.symbols.push(func);
      step = 4;
      break;

    case 's':

      if (/sqrt/.test(expression)) {
        DataExp.symbols.push('q');
        step = 4;
      } else if (/sin/.test(expression)) {
        DataExp.symbols.push(func);
        step = 3;
      }
      break;

    case 'c':

      if (/cos/.test(expression)) DataExp.symbols.push(func);
      step = 3;
      break;

    case 't':

      if (/tan/.test(expression)) DataExp.symbols.push(func);
      step = 3;
      break;
  }
  return step;
}

function Calculation() {
  Parser();
  let first = 0, second = 0;
  for (let index in DataExp.numbers) {
    if (!isNaN(parseFloat(DataExp.numbers[index]))) {
      
      DataExp.digits.push(DataExp.numbers[index]);

    } else {
      if (binar.has(DataExp.numbers[index])) {

        first = Number(DataExp.digits[DataExp.digits.length - 1]);
        DataExp.digits.pop();
        second = Number(DataExp.digits[DataExp.digits.length - 1]);
        DataExp.digits.pop();
        DataExp.digits.push(binar.get(DataExp.numbers[index])(first, second));

      } else if (unar.has(DataExp.numbers[index])) {

        first = Number(DataExp.digits[DataExp.digits.length - 1]);
        DataExp.digits.pop();
        DataExp.digits.push(unar.get(DataExp.numbers[index])(first));

      }
    }
  }
  let result = Number(DataExp.digits[DataExp.digits.length - 1]);
  return result;
}


function ValidateString(str) {
  if (!Check(str)) return false;

  if (!isNaN(parseFloat(str[0])) || str[0] == 'x' || str[0] == '(') {
    if (ValitadeDigits(str)) return true;
  }

  if (/^[a-z]/.test(str[0])|| str[0] == '(') return ValidateFunctions(str);

  return false;
}

function ValitadeDigits(str) {
  if (str.length == 0) return true;

  if (digits.test(str)) return ValidateOperators(str.substr((str.match(digits).length)));

  return false;
}

function ValidateOperators(str) {
  if (str.length == 0) return true;

  if (operators.test(str)) {
    let size = (str.match(operators)).length;

    if (ValitadeDigits(str.substr(size)))
      return true;
    else
      return ValidateFunctions(str.substr(size));
  }
  return false;
}

function ValidateFunctions(str) {
  if (str.length == 0) return true;

  if (functs.test(str)) {
    let size = (str.match(functs)).length;

    if (ValitadeDigits(str.substr(size))) return true;

    return ValidateFunctions(str.substr(size));
  }
  return false;
}

function Check(str) {
  let it = 0;
  let s = [];
  while (it != str.length && str[it] != '(' && str[it] != ')') {
    ++it;
  }
  while (it != str.length) {
    if (str[it] == '(') s.push('(');
    else if (str[it] == ')') {
      if (s.length == 0) return false;
      s.pop();
    }
    ++it;
  }
  return (s.length==0);
}



