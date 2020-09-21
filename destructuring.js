// 구조 분해 할당

let candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    console.log(this);
    this.status.count--;
    return this.status.count;
  },
};
// let status = candyMachine.status;
// let getCandy = candyMachine.getCandy;
const { status, getCandy } = candyMachine; //  객체일 경우 위 코드를 이와 같이 나타낼수 있다.

// getCandy();
/**  getCandy 함수에 담긴 것은 다음과 같은 함수이고, 이 함수를 실행했을때 위치는 window 이다. 그래서 this는 window or global 이다.
 *  function(){this.status.count--;
 *    return this.status.count};
 *
 */
candyMachine.getCandy();
/** candyMachine.getCandy 함수를 실행했을때는 getCandy함수가 실행되는 위치가 candyMachine안에 있다.
 * 그래서 this는 candyMachine이 된다.
 *
 */

//  this 해결방안
getCandy.call(candyMachine);
getCandy.apply(candyMachine);

let array = ['nodejs', {}, 10, true];

// const node = array[0];
// const obj = array[1];
// const num = array[2];
// const bool = array[array.length - 1];
let [node, obj, num, bool] = array; // 위 코드와 같은 코드 이다.
// const [node, obj, , bool] = array; // 만약 중간에 안가져 오는 것은 빈칸으로 둔다.
// let [node, obj, ...bool] = array; // 만약 뒤에 10과 true 를 넣고 싶면

console.log(bool);

const m = (x, y) => console.log(x, y);
m(5, 6);

m(5, 6, 7, 8); // 앞에 두개만 들어간다.

// 만약 y에 나머지를 다 넣고 싶으면 Rest parameters 를 사용하면 된다.
const n = (x, ...y) => console.log(x, y);
const o = (x, ...y) => console.log(x, ...y);
n(5, 6, 7, 8); // 5 [ 6, 7, 8 ]
o(5, 6, 7, 8); // 5 6 7 8

// es6 전에는 arguments 를 사용했었으나 es6 부터는 사용하지 않는다.
function q() {
  console.log(arguments);
}
q(1, 2, 3, 4, 5, 6, 7, 7);

// arguments와 Rest parameters 의 차이
//arguments는 배열이 아니다. 유사배일아라고 부른다. length 를 제외한 다른 기능이 없다.
// Rest parameters 는 배열이다.

const p = () => console.log(arguments); // q 함수와 같은 결과를 예상했으나,
p(1, 2, 3, 4, 5, 6, 7, 7); // arguments 는 다른 값을 리턴한다. 뭔지 잘 모르겠다.
//크롬 개발자 도구에서는  arguments is not defined 를 리턴한다.

var test = (one, two, ...rest) => [one, two, rest];
console.log(test(1, 2, 3, 4, 5, 6, 7)); //[ 1, 2, [ 3, 4, 5, 6, 7 ] ]
var bar = (...arguments) => console.log(arguments);
bar(1, 2, 3, 4, 5, 6, 7); // arguments는 예약어가 아니다.
