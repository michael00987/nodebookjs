const util = require('util');
const crypto = require('crypto');

const dontuseme = util.deprecate((x, y) => {
  console.log(x + y);
}, '이 함수는 2018년 12월 부로 지원 하지 않습니다.'); // 2번째 인자로 설명이 들어가야 한다.

dontuseme(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt', salt);
  console.time('시간');
  crypto.pbkdf2('michael0987', salt, 1412304, 64, 'sha512', (err, key) => {
    // 비밀번호, 솔트, 복잡도, 64바이트, 암호화 알고리즘, 콜백
    console.log('password', key.toString('base64'));
    console.timeEnd('시간');
  });
});

//---------------위와 아래는 같은 코드이다.---------------

randomBytesPromise(64)
  .then((buf) => {
    const salt = buf.toString('base64');
    return pbkdf2Promise('michael', salt, 1412304, 64, 'sha512');
  })
  .then((key) => {
    console.log('password', key.toString('base64'));
  })
  .catch((e) => {
    console.error(e);
  });

// async 로 변환----------------------------------------

(async () => {
  const buf = await randomBytesPromise(64);
  const salt = buf.toString('base64');
  const key = await pbkdf2Promise('michael', salt, 1412304, 64, 'sha512');
  console.log('password', key.toString('base64'));
})();
