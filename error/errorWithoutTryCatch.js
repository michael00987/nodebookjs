process.on('uncaughtException', (err) => {
  console.log('예기치 못한 에러', err);
}); // 잡아내지 못한 모든 에러를 잡아낸다. 하지만 그 에러가 계속 난다는 것이다. 근본적인 해결책은 아니다.
//  에러가 나서 노드가 죽을수 있는데, 콜백 안에 서버를 복구하는 코드를 넣을수 있다.
// 하지만 콜백이 실행 된다는 보장은 못한다.

setInterval(() => {
  throw new Error('서버를 고장내 주마');
}, 1000);

setTimeout(() => {
  console.log('실행 됩니다.');
}, 2000);
