const crypto = require('crypto');

//createCipher is deprecated
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');

let result = cipher.update('michael', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호', result);

const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('평문', result2);

// 열쇠가 다르면 복호화 할수 없다.
const decipher3 = crypto.createDecipher('aes-256-cbc', '다른열쇠');
let result3 = decipher3.update(result, 'base64', 'utf8');
result3 += decipher3.final('utf8');
console.log('평문', result3);
