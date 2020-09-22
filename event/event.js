const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('방문', () => {
  console.log('방문해주셔서 감사합니다.');
});

myEvent.on('종료', () => {
  console.log('안녕히 가세요');
});

myEvent.on('종료', () => {
  console.log('제발 좀 가세요');
});

myEvent.once('특별 이벤트', () => {
  console.log('한 번만 실행됩니다.');
});

// myEvent.emit('방문');
// myEvent.emit('종료');
// myEvent.emit('특별 이벤트');
// myEvent.emit('특별 이벤트');
myEvent.on('계속', () => {
  console.log('계속 리스닝');
});
myEvent.removeAllListeners('계속');
myEvent.emit('계속');

const callback = () => {
  myEvent.on('종료1', () => {
    console.log('안녕히 가세요');
  });
};

myEvent.removeListener('종료1', callback); // 한개를 지우고 싶으면 해당 이벤트를 함수로 정의하고 해당 함수를 제거한다.

myEvent.emit('종료1');
console.log(myEvent.listenerCount('종료1'));
