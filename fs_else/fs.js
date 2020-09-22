const fs = require('fs');

fs.access(
  // 폴더나 파일이 존재하는지 알아보는 메서드
  './folder',
  fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, // 파일 존재여부, 읽을수 있는지, 쓸수 있는지
  (err) => {
    // 폴더가 없으면 에러
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('폴더 없음');
        //없으니깐 폴더 만들고
        fs.mkdir('./folder', (err) => {
          // 만들지 못했으면 에러
          if (err) {
            throw err;
          }
          console.log('폴더 만들기 성공');
          // 파일을 열어보는데 없으면 에러
          fs.open('./folder/file.js', 'w', (err, fd) => {
            // w 옵션은 작성 a 옵션은 추가
            if (err) {
              throw err;
            }
            console.log('빈 파일 만들기 성공', fd);
            fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
              //파일명 변경
              if (err) {
                throw err;
              }
              console.log('이름 바꾸기 성공');
            });
          });
        });
      } else {
        throw err;
      }
    } else {
      console.log('이미 폴더 있음');
    }
  }
);
