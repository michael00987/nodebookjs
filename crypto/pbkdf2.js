const crypto = require('crypto');

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

// 실무에서는 bcrypt 등을 사용한다.
