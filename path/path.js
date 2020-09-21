const path = require('path');

console.log(path);

console.log('경로 구분자', path.sep);
console.log('환경변수 구분자', path.delimiter);

console.log('파일이 있는 경로', path.dirname(__filename));
console.log('파일의 확장자', path.extname(__filename));
console.log('파일이름', path.basename(__filename));

console.log('파일에 대한 정보를 객체로 찢어줌', path.parse(__filename));

console.log(
  // /Users/michael/Documents/study/nodebookjs/path/path.js
  '파일정보를 하나로 함쳐줌',
  path.format({
    root: '/',
    dir: '/Users/michael/Documents/study/nodebookjs/path',
    base: 'path.js',
    ext: '.js',
    name: 'path',
  })
);

console.log(
  '경로를 알아서 잘 변경해 준다. 그런데 mac 에서는 잘 모르겠다.',
  path.normalize('/Users/michael/Docum로nts/study/nodebookjs\\\\\\\\path')
);
console.log('파일에 대한 정보를 객체로 찢어줌', path.isAbsolute('/Users'));
console.log(
  '앞의 경로에서 뒤의 경로로 가기 위한 상대경로',
  path.relative('/Users/michael/Documents/study/nodebookjs/path', '/Users')
);

console.log(__dirname);
console.log(path.join(__dirname, '..', '..', '/users', '.', '/michael')); // 절대경로로 상대경로로 생각한다.
console.log(path.resolve(__dirname, '..', '..', '/users', '.', '/michael')); // 절대경로를를절대경로로 생각한다.
