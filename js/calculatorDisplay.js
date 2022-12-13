document.getElementById('zero').addEventListener('click', function () {
  document.getElementById('display-input').value += 0;
});

document.getElementById('one').addEventListener('click', function () {
  document.getElementById('display-input').value += 1;
});

document.getElementById('two').addEventListener('click', function () {
  document.getElementById('display-input').value += 2;
});

document.getElementById('three').addEventListener('click', function () {
  document.getElementById('display-input').value += 3;
});

document.getElementById('four').addEventListener('click', function () {
  document.getElementById('display-input').value += 4;
});

document.getElementById('five').addEventListener('click', function () {
  document.getElementById('display-input').value += 5;
});

document.getElementById('six').addEventListener('click', function () {
  document.getElementById('display-input').value += 6;
});

document.getElementById('seven').addEventListener('click', function () {
  document.getElementById('display-input').value += 7;
});

document.getElementById('eight').addEventListener('click', function () {
  document.getElementById('display-input').value += 8;
});

document.getElementById('nine').addEventListener('click', function () {
  document.getElementById('display-input').value += 9;
});

document.getElementById('clear').addEventListener('click', function () {
  document.getElementById('display-input').value = '';
});

document.getElementById('delete').addEventListener('click', function () {
  document.getElementById('display-input').value = document.getElementById('display-input').value.slice(0, -1);
});

document.getElementById('pow').addEventListener('click', function () {
  document.getElementById('display-input').value += '^';
});

document.getElementById('left-bracket').addEventListener('click', function () {
  document.getElementById('display-input').value += '(';
});

document.getElementById('right-bracket').addEventListener('click', function () {
  document.getElementById('display-input').value += ')';
});

document.getElementById('dot').addEventListener('click', function () {
  document.getElementById('display-input').value += ',';
});

document.getElementById('sin').addEventListener('click', function () {
  document.getElementById('display-input').value += 'sin';
});

document.getElementById('asin').addEventListener('click', function () {
  document.getElementById('display-input').value += 'asin';
});

document.getElementById('sqrt').addEventListener('click', function () {
  document.getElementById('display-input').value += '√';
});

document.getElementById('plus').addEventListener('click', function () {
  document.getElementById('display-input').value += '+';
});

document.getElementById('cos').addEventListener('click', function () {
  document.getElementById('display-input').value += 'cos';
});

document.getElementById('acos').addEventListener('click', function () {
  document.getElementById('display-input').value += 'acos';
});

document.getElementById('mod').addEventListener('click', function () {
  document.getElementById('display-input').value += '%';
});

document.getElementById('minus').addEventListener('click', function () {
  document.getElementById('display-input').value += '-';
});

document.getElementById('tan').addEventListener('click', function () {
  document.getElementById('display-input').value += 'tan';
});

document.getElementById('atan').addEventListener('click', function () {
  document.getElementById('display-input').value += 'atan';
});

document.getElementById('x').addEventListener('click', function () {
  document.getElementById('display-input').value += 'x';
});

document.getElementById('mul').addEventListener('click', function () {
  document.getElementById('display-input').value += '*';
});

document.getElementById('log').addEventListener('click', function () {
  document.getElementById('display-input').value += 'log';
});

document.getElementById('ln').addEventListener('click', function () {
  document.getElementById('display-input').value += 'ln';
});

document.getElementById('div').addEventListener('click', function () {
  document.getElementById('display-input').value += '/';
});