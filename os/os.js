const os = require('os');
console.log(os.arch());
console.log(os.platform());
console.log(os.type());
console.log('운영체제가 시작하고 지난시간', os.uptime());
console.log('컴퓨터 이름', os.hostname());
console.log('os 버전전', os.release());
console.log('home 경로', os.homedir());
console.log('tmp 경로', os.tmpdir());
console.log('남은 메모리', os.freemem());
console.log('전체 메모리', os.totalmem());
console.log('cpu와  쓰레드 정보', os.cpus()); // cpu 갯수/ 쓰레드 갯수??를 파악해서 노는 cpu 가 없도록 cpu 갯수 만큼 node 를 실행할수 있다.
