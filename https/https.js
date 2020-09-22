const fs = require('fs');
const http = require('http'); // 1.1
const https = require('https');
const http2 = require('http2'); // https 와 비슷

http
  .createServer((req, res) => {
    res.end('http server');
  })
  .listen(80);
https
  .createServer(
    {
      cert: fs.readFileSync('도메인 인증서 경로'),
      key: fs.readFileSync('도메인 인증서 경로'),
      ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
      ],
    },
    (req, res) => {
      res.end('https server');
    }
  )
  .listen(443);

// http2 는 https 기반이기 때문에 인증서가 필요하다
http2
  .createSecureServer(
    {
      cert: fs.readFileSync('도메인 인증서 경로'),
      key: fs.readFileSync('도메인 인증서 경로'),
      ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
      ],
    },
    (req, res) => {
      res.end('https server');
    }
  )
  .listen(443);
