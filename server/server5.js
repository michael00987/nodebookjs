const { fstat } = require('fs');
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

const server = http
  .createServer((req, res) => {
    console.log(req.url, parseCookies(req.headers.cookie));
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const randomInt = +new Date();
      const expires = new Date();
      session[randomInt] = {
        name,
        expires,
      };
      expires.setMinutes(expires.getMinutes() + 5); // 유효시간을 5분으로 설정
      res.writeHead(302, {
        Location: '/',
        //200은 성공을 의미한다.
        //302 는 다른 페이지로 이동을 의미한다.
        'Set-Cookie': `session=${randomInt};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
      });
      res.end(name);
    } else if (
      cookies.session &&
      session[cookies.session] &&
      session[cookies.session].expires > new Date()
    ) {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
      res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
      fs.readFile('./server4.html', (err, data) => {
        res.end(data);
      });
    }
  })
  .listen(8080);
server.on('listening', () => {
  '8080 포트에 연결';
});

/**
 * 처음 들어 왔을때,html을 보낸다
 * 입력한 내용을 서버에서 받아서 쿠키가 있으면
 * 쿠키에서 이름을 뽑아고 루트로 보내면서 쿠키도 보낸다.
 * 루트로 들어왔으니, 루트에서 쿠키가 있는지 확인하고, 이름을 보여준다.
 */
