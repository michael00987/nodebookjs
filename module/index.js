const checkOddOrEven = require('./func');
const { odd, even } = require('./var');

function checkStrOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log('숫자', checkOddOrEven(20));
console.log('문자', checkStrOddOrEven('hello'));
