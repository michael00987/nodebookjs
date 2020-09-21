const crypto = require('crypto');

console.log(crypto.createHash('sha512').update('비밀번호').digest('base64')); // '비밀번호'를 'sha512'방식으로 암호화해서 'base64' 방식으로 보여준다.
// 암호를 hash 로 암호화 하면 복호화 할수 없다.

// 암호화한 값이  서로 일치하는지 확인해서 일치하면 암호가 같다고 간주한다.
// 간혹 암호가 다른데 hash 값이 같아서 통과 되는 경우(비밀번호 충돌)가 있는데, 해커는 이러한 부분을 노릴수 있다.
// 이건 salt 같은게 없어서 조금만 공격하면 뚤릴수 있다.
