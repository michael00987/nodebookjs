let condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});
promise
  .then((message1) => {
    console.log('1', message1);
    return new Promise((resolve, reject) => {
      resolve(message1);
    });
  })
  .then((message2) => {
    console.log('2', message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log('3', message3);
  })
  .catch((e) => {
    console.error(e);
  });

// 위 코드) 아무 문제가 없으면 message1,message2,message3 을 출력할 것이다.
//  아래 코드 ) 실행중에 문제가 생기면 reject가 있는 message2에서 실행을 멈추고 catch 로 넘어가고 끝난다.
promise
  .then((message1) => {
    console.log('11', message1);
    return new Promise((resolve, reject) => {
      resolve(message1);
    });
  })
  .then((message2) => {
    console.log('22', message2);
    return new Promise((resolve, reject) => {
      reject(message2);
    });
  })
  .then((message3) => {
    console.log('3', message3);
  })
  .catch((e) => {
    console.error('에러', e);
  });

// 무조건 성공하는 프로미스 는 then 만 있으면 된다.
const successPromise = Promise.resolve('성공').then((data) =>
  console.log('성공만 하는 프로미스', data)
);
// 무조건 실패하하 프로미스 는 catch 만 있으면 된다.
const failPromise = Promise.reject('실패').catch((e) => {
  console.log('실패만 하는 프로미스');
  console.error(e);
});
