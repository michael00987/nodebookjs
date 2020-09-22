const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('세번째 라우터 미들웨어');
  // res.sendFile('html 파일 경로'); // sendFile() 는 html 파일을 보낼수 있고 render()는 퍼그파일을 보낼수 있다.
  res.render('test2', {
    // 변수의 우선순위는 pug 파일 안에 있는 변수이고 해당 변수가 없다면 render의 두번째 인자로 넣은 변수를 사용한다.
    title: 'express',
    title2: 'hello',
  });
  // html 파일을 보낼수 있지만 html 파일을 보내는 것은 비효율 적이다.
  // 이유는 li 태그를 100줄 보내야 하면 js 파일에서는 반복문을 사용하면 되지만 html은 변수나 조건문 반복문을 사용할수 없다.
  // html 에서는 한땀 한땀 정성것 100줄을 작성해야한다.
  // html의 한계를 극복한 pug와 EJS 템플릿 엔진을 사용해볼 것이다.
});

router.get('/posts', (req, res) => {
  res.send('Hello posts');
});
router.get('/comments', (req, res) => {
  res.send('Hello comments');
});
router.get('/list', (req, res) => {
  res.send('Hello list');
});
router.post('/', (req, res) => {
  res.send('Hello post');
});

module.exports = router;
