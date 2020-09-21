console.log(process);
console.log('노드가 설치된 버전', process.version); // 노드버전 ====> v12.18.4
console.log('아키텍처', process.arch); // 맥 ===> x64
console.log('운영체제 정보', process.platform); // 맥 ===> darwin
console.log('현재 실행중인 프로페스 id', process.pid); // 실행할때마다 값이 변한다....1초마다 1씩 증가하는거 같다. 노드가 실행된 상태에서는 변하지 않는다.
console.log('노드 프로그램이 실행된지 얼마나 지났나', process.uptime()); // 실행할때마다 값이 변한다....1초마다 1씩 증가하는거 같다.
console.log('노드 프로그램이 어느 경로에서 실행되는지 알려줌', process.cwd()); // _dir 과는 차이가 있다. node 의 실행 경로(cwd), 파일이 존재하는 경로로__dirname)

console.log('노드가 설치된 경로', process.execPath);
console.log('cpu 사용량', process.cpuUsage());

for (let i = 0; i < 100000; i++) {
  // exit 를 사용해서 이와 같은 코드를 작성할수 있다.
  // 서비스 중에 에러가 발생하면 죽이고 다시 실행하는 코드를 작성할때 사용할수 있다.
  console.log(i);
  if (i === 100) {
    process.exit();
  }
}

console.log('node 프로그램 종료', process.exit()); // 프로그램을 종료할때 사용된다.

// 위 코드는 웹 보다는 데스크탑 프로그래밍을 할때 사용된다.
