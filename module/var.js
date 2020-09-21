const odd = '홀수';
let even = '짝수';

console.log(odd);
even = even + 'michael';
// 내보내기 전에는 example.html 에서 테스트 가능

// 아래 코드는 동일한 코드이다.
// module.exports.odd = odd 와 같이 변환해도 작동했다.
// 그러나 exports={odd, even} 과 같이 작성했을 때는 작동하지 않았다.
// 둘다 알고 있어야 겠지만, 주력을 하나 선택하는게 좋을것 같다.
// 나는 module.exports 를 사용한다.
exports.odd = odd;
exports.even = even;
// module.exports = { odd, even }; // 모듈로 내보내면 exmple.html 없이 node에서 테스트할수 있다.
