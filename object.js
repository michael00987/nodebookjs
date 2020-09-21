/** old 문법 */
const sayNode = function () {
  console.log('Node');
};
const es = 'ES';
const oldObject = {
  sayJS: function () {
    console.log('JS');
  },
  sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';

oldObject.sayNode();
oldObject.sayJS();

console.log(oldObject.ES6);
console.log('---------------------------');
// /** new 문법 */
const newObject = {
  sayJS() {
    // function 키워드가 없어도 가독성에 문제가 없기 때문에 지워도 된다.
    console.log('JS');
  },
  sayNode, // key value 쌍이 같으면 한번만 작성한다.
  [es + 6]: 'Fantastic', // 동적 속성 할당을 리터럴 안에 표현 가능하다.(key 에 변수가 들어갈수 있다.)
};

newObject.sayNode();
newObject.sayJS();

console.log(newObject.ES6);

console.log('---------------------------');

function add1(x, y) {
  //함수 선언문  함수의 처음으로 올라가는거...호이스팅
  return x + y;
}

const add2 = function (x, y) {
  // 함수 표현식
  return x + y;
};
const add2 = (x, y) => x + y; // 화살표 함수   함수의 내용이 리턴만 있는 경우에는 중괄호와 return 키워드를 생략할수 있다. 소괄호로 묶어도 리턴하는 것이다.
