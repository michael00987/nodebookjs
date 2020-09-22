const http = require('http');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const server = http
  .createServer((req, res) => {
    console.log(req.url, parseCookies(req.headers.cookie)); // 자바스크립트 객체가 나온다.
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test' }); // 헤더를 만든다.
    res.end('Hello Cookie'); // 클라이언트에 응답한다. 헤더는 이때 같이 전달된다.
  })
  .listen(8080);

server.on('listening', () => {
  console.log('server3  ===> 8080번 포트에 연결');
});
server.on('error', (error) => {
  console.error(error);
});
