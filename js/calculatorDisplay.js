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

const step = new Map ([
  ['n', 2],
  ['g', 3],
  ['r', 4],
  ['o', 4],
  ['a', 4],
  ['q', 4],
  ['s', 3],
  ['c', 3],
  ['t', 3]
])
// const digits = new RegExp("^\\(*((\\d+\\.?\\d*))\\)*");

const digits = /\d+\.?\d*/;

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
          if (!ValidateString(str)) document.getElementById('display-input').value = "Incorrect Input";
          else document.getElementById('display-input').value = Calculation(str);
          
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
        case '√':
          document.getElementById('display-input').value += 'sqrt';
          break;
        default:
          document.getElementById('display-input').value += buttonValue.textContent;
      }
    }
  }
}

function PolishNotation(str) {

  let expression = str.split('');

  for (let index = 0; index < expression.length;) {

    if (binary.has(expression[index])) {

      if (CheckUnarMinus && expression[index] == '-' &&  DataExp.numbers.length==0) DataExp.symbols.push('~');
      else AddSymbols(expression[index]);

      index++;

    } else if (functions.has(expression[index])) {

      index += AddFunction(expression[index], index, expression);

    } else if (!isNaN(parseFloat(expression[index]))) {
      let num = ConcatArrayElements(index, expression);
      console.log(num);
      DataExp.numbers.push(num);
      index += num.length;
    }
  }
  console.log(DataExp.symbols)
  console.log(DataExp.numbers)

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
  console.log(DataExp.numbers);
}

function AddFunction(func, index, expression) {
  expression = expression.slice(index, expression.length);
  switch (func) {
    case 'l':

      if (/^[log]/.test(expression)) DataExp.symbols.push('g');
      else DataExp.symbols.push('n');
      break;

    case 'a':

      if (/^[asin]/.test(expression)) DataExp.symbols.push('r');
      else if (/^[acos]/.test(expression)) DataExp.symbols.push('o');
      else if (/^[atan]/.test(expression)) DataExp.symbols.push(func);
      break;

    case 's':

      if (/^[sqrt]/.test(expression)) DataExp.symbols.push('q');
      else if (/^[sin]/.test(expression)) DataExp.symbols.push(func);
      break;

    case 'c':

      if (/^[cos]/.test(expression)) DataExp.symbols.push(func);
      break;

    case 't':

      if (/^[tan]/.test(expression)) DataExp.symbols.push(func);
      break;
  }

  console.log(DataExp.symbols);
  let steps = step.get(DataExp.symbols[DataExp.symbols.length-1]);
  return steps;
}

function Calculation(str) {
  PolishNotation(str);
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

  if(str[0] == '-') str=str.substr(1);
  if(str[0] == '(') str=str.substr(1);

  if (!isNaN(parseFloat(str[0])) || str[0] == 'x' || str[0] == '(') {
    if (ValitadeDigits(str)) return true;
  }

  if (/^[a-z]/.test(str[0])|| str[0] == '(') return ValidateFunctions(str);

  return false;
}


function ValitadeDigits(str) {
  if (str.length == 0) return true;

  if (/\(*\d+\.?\d*\)*/.test(str)) {
    str = str.slice(str.match(/\(*\d+\.?\d*\)*/)[0].length, str.length);
    return ValidateOperators(str);
  }

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

  if (/^(log|ln|sin|cos|tan|acos|asin|atan|sqrt)/.test(str)) {

    str = str.slice(str.match(/^(log|ln|sin|cos|tan|acos|asin|atan|sqrt)/)[0].length, str.length)

    if (ValitadeDigits(str)) return true;

    return ValidateFunctions(str);
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



