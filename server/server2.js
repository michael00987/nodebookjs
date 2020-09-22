const http = require('http');
const fs = require('fs');

const server = http
  .createServer((req, res) => {
    console.log('서버 실행');
    fs.readFile('./server2.html', (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data); // 브라우저가 알아서 처리하기때문에 toString()은 생략해도 된다.
    });
  })
  .listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에 연결');
});
server.on('error', (error) => {
  console.error(error);
});
