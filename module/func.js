const { odd, even } = require('./var'); // 모듈로 내보내면 exmple.html 없이 node에서 테스트할수 있다.

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}
// 객체 리터럴 처럼 속성이 있는 것이 아니기 대문에 exports.으로 변환할수 없다.
module.exports = checkOddOrEven;
