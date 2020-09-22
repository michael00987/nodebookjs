const http = require('http');
const fs = require('fs');
const users = {};

const router = {
  GET: {
    '/': (req, res) => {
      fs.readFile('./restFront.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    },
    '/users': (req, res) => {
      res.end(JSON.stringify(users));
    },
    '*': (req, res) => {
      fs.readFile(`.${req.url}`, (err, data) => {
        return res.end(data);
      });
    },
  },
  POST: {
    '/users': (req, res) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        console.log('POST 본문(body)', body);
        const { name } = JSON.parse(body);
        const id = +new Date();
        users[id] = name;
        res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('사용자 등록 성공');
      });
    },
  },
  PUT: {
    '/': (req, res) => {},
    '/users': (req, res) => {
      const id = req.url.split('/')[2];
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      return req.on('end', () => {
        console.log('put', body);
        users[id] = JSON.parse(body).name;
        return res.end(JSON.stringify(users));
      });
    },
  },
  PATCH: {
    '/users': (req, res) => {},
  },
  DELETE: {
    '/users': (req, res) => {
      const id = req.url.split('/')[2];
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      return req.on('end', () => {
        console.log('delete', body);
        delete users[id];
        return res.end(JSON.stringify(users));
      });
    },
  },
};
const server = http
  .createServer((req, res) => {
    const matchedUrl = router[req.method][req.url];
    matchedUrl || router[req.method['*']](req, res);
    // || (default operater) : 기본값 연산자
    // && (guard operater) : 보호 연산자
  })
  .listen(8080);
server.on('listening', () => {
  console.log('8080에 연결');
});

// exporess , koa 같은 프레임워크을 사용할수 없을때는 위와 같이 사용하면 된다.
