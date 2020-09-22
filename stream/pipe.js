const fs = require('fs');
const zlib = require('zlib');
// 파일 복사하는 방법
// 방법1
const zlibStream = zlib.createGzip();
const readStream = fs.createReadStream('readme2.txt');
const writeStream = fs.createWriteStream('writeme4.txt');

// readStream.pipe(writeStream);
// readStream.pipe(writeStream).pipe().pipe()  // 스트림간의 파이프는 이어서 작성할수 있다.
readStream.pipe(zlibStream).pipe(writeStream);
// 방법2
fs.copyFile('readme3.txt', 'writeme3.txt', (err) => {
  console.log(err);
});
