"use strict";

class Calculator {
  static binary = new Set(['+', '-', '*', '/', '^', '%', '(', ')']);
  static functions = new Set(['s', 'c', 't', 'a', 'l']);

  static priority = new Map([
    ['+', 1],
    ['-', 1],
    ['*', 2],
    ['/', 2],
    ['%', 2],
    ['^', 3],
    ['~', 0],
    ['s', 4],
    ['n', 4],
    ['g', 4],
    ['q', 4],
    ['r', 4],
    ['o', 4],
    ['a', 4],
    ['c', 4],
    ['t', 4]
  ]);
  
  static binar = new Map([
    ['+', function plus(a, b) { return a + b; }],
    ['-', function minus(a, b) { return b - a; }],
    ['*', function mul(a, b) { return a * b; }],
    ['/', function div(a, b) { return b / a; }],
    ['^', function pow(a, b) { return Math.pow(b, a); }],
    ['%', function fmod(a, b) { return Math.fmod(b, a); }]
  ]);

  static unar = new Map([
    ['s', function sin() { return Math.sin(a); }],
    ['c', function cos() { return Math.cos(a); }],
    ['t', function tan() { return Math.tan(a); }],
    ['r', function asin() { return Math.asin(a); }],
    ['o', function acos() { return Math.acos(a); }],
    ['a', function atan() { return Math.atan(a); }],
    ['g', function log() { return Math.log(a); }],
    ['n', function log10() { return Math.log10(a); }],
    ['q', function sqrt() { return Math.sqrt(a); }],
    ['~', function unarMinus() { return a *= -1; }]
  ]);

}


function CreateEvents() {
  for (let i = 0; i < document.getElementsByClassName('CalcButton').length; i++) {
    document.getElementsByClassName('CalcButton')[i].onclick = function () {
      let buttonValue = document.getElementsByClassName('CalcButton')[i];
      switch (buttonValue.textContent) {
        case '=':
          Parser();
          break;
        case 'graph':
          console.log('eq and graph buttons');
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
  document.getElementById('display-input').value = 0;
}


CreateEvents();

