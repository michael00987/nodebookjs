// 노드는 기본적으로 싱글 스레드로 작동하기 때문에 다른 언어들보다 예외처리가 중요하다.
// 타 언어는 멀티스레드로 작동하는 경우가 있기 때문에 하나의 스레드가 죽어도 그 일을 다른 스레드가 대신할수 있다.
// 하지만 하나의 스레드로 작동하는 노드는 하나가 죽으면 더이상 작동하는  스레드가 없기때문에 끝~

const fs = require('fs');

setInterval(() => {
  console.log('시작');
  try {
    throw new Error('서버를 고장내 주마');
  } catch (e) {
    console.log(e);
  }
}, 1000);

// 에러를 try catch 로 잡을수 있지만, 이러한 에러는 애초에 일어나지 않게 코드를 작성하는게 중요하다.
// async await 처럼 어쩔수 없이 사용해야 하는 경우도 있다.
setInterval(() => {
  fs.unlink('./asdfasf.js', (err) => {
    // 노드 내장 메서드에서 발생하는 에러때문에 노드가 죽지는 않는다.
    // 이런건 따로 에러처리를 할 필요는 없고, 기록해 뒀다. 해결하면 된다.
    if (err) {
      console.log('시작');
      console.log(err);
      console.log('끝');
    }
  });
}, 1000);
