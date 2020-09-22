const http = require('http');
const server = http
  // 기본 이벤트가 방문이기 때문에 이벤트 명을 생략할수 있다.
  .createServer((req, res) => {
    console.log('서버 실행');
    res.write('<h1>Hello Node!</h1>');
    res.write('<h2>Hello js!</h2>');
    res.write('<h3>Hello html!</h3>');
    res.end('<p>Hello Server!</p>');
    // write 는 여러번 작성할수 있기 때문에 end로 끝난것을 명시적으로 해야 한다.
  })
  .listen(8080);

server.on('listening', () => {
  // listen 메서드가 서버를 죽지 않게 유지시켜준다.
  console.log('8080번 포트에 연결');
});
server.on('error', (error) => {
  // 서버가 죽는것을 막을수는 없지만 왜 죽었는지 알수는 있다.
  console.error(error);
});
