const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500);
const interval = setInterval(() => {
  console.log('1초 마다실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행 되지 않습니다.');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2999.9999999999999);

const im = setImmediate(() => console.log('즉시실행')); // 즉시 실행 할거면 그냥 console.log('즉시실행')  하면 되는데 setImmediate 메서드를 사용하는 이유??
// 이벤트 루프로 보내서 실행순서를 다르게 할때 사용할수 있다.
clearImmediate(im);

// 즉시실행 할때 아래와 같은 코드를 사용하지 말자!! setImmediate 를 사용하자
const timeout3 = setTimeout(() => {
  console.log('즉시실행');
}, 0);
