const fs = require('fs');

// console.log('시작');
// fs.readFile('./readme2.txt', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log('1번', data.toString());
// });
// fs.readFile('./readme2.txt', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log('2번', data.toString());
// });
// fs.readFile('./readme2.txt', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log('3번', data.toString());
// });

// // 같은 파일을 읽는데 누가 먼저 읽는지 모른다.

// // 순서대로 읽을때는 async를 사용하면 된다.

// // ---------------------아래는 콜백핼------
// console.log('시작');
// fs.readFile('./readme2.txt', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log('1번', data.toString());
//   fs.readFile('./readme2.txt', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log('2번', data.toString());

//     fs.readFile('./readme2.txt', (err, data) => {
//       if (err) {
//         throw err;
//       }
//       console.log('3번', data.toString());
//     });
//   });
// });

// --------------------동기 메서드------
// readFileSync 메서드는 콜백을 받지 않는다.  이건 블로킹이다. 그래서 이 파일을 읽는 동안은 다른 요청을 처리할수 없다.
// 데스크탑 프로그램 혹은 딱 한번만 실행되는 함수 같은 경우 sync 메서드를 사용한다.
console.log('시작');
let data1 = fs.readFileSync('./readme2.txt');
console.log('동기 1번', data1.toString());
let data2 = fs.readFileSync('./readme2.txt');
console.log('동기 2번', data2.toString());
let data3 = fs.readFileSync('./readme2.txt');
console.log('동기 3번', data3.toString());
