const http = require('http');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log('마스터 프로세스 아이디', process.pid);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // 워커를 만들어냄
  }
  //워커가 일을 하다 쓰러지면 exit 이벤트가 발생한다.
  cluster.on('exit', (worker, code, signal) => {
    console.log(worker.process.pid, '워커가 종료 되었습니다.');
    // cluster.fork(); // 쓰러졌으니깐 새로 생성
  });
} else {
  http
    .createServer((req, res) => {
      res.end('http server');
      setTimeout(() => {
        process.exit();
      }, 1000);
    })
    .listen(8080);
  console.log(process.pid, '워커 실행');
}
