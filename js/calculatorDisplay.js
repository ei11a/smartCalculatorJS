for(let i = 0; i < document.getElementsByClassName('CalcButton').length; i++) {
  document.getElementsByClassName('CalcButton')[i].onclick = function (){
    let buttonValue = document.getElementsByClassName('CalcButton')[i];
    switch (buttonValue.textContent)
    {
      case '=':
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
