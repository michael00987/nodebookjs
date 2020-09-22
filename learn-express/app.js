const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//   // 모든 미들웨어를 use 하나에 작성할수 있다.
// app.use(
//   logger('dev'),
//   express.static(path.join(__dirname, 'public')),
//   express.json(),
//   express.urlencoded({ extended: false }),
//   cookieParser('secret code'),
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: 'secret code',
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   }),
//   flash()
// );
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // 정적파일 가져오는 미들웨어 // static은 폴더 안에 해당 파일이 없을 경우에만  next()를 한다.
app.use(express.json()); // 구 body-parser
app.use(express.urlencoded({ extended: false })); // 구 body-parser
app.use(cookieParser('secret code')); // 쿠키 파싱하는 미들웨어 // 비밀키로 클라이언트로부터 받은 쿠키가 변조된것인지 확인한다.
app.use(
  session({
    // 보통 메모리에 저장되는데 휘발되지 않게 db에 저장하기도 한다.
    resave: false, //true  요청이 들어오면 수정사항이 없어도 계속 저장한다.  변동사항이 없는데 저장하는 것은 낭비이기 때문에 보통 false 로 한다.
    saveUninitialized: false, // true 이면 처음의 빈 세션객체라도 저장한다. 데이터가 없는데 저장하는 것은 낭비이기 때문에 보통 false 로 한다.
    secret: 'secret code', // 쿠키의 시크릿이라서 쿠키파서에도 넣어준다.
    cookie: {
      //세션 id 를 쿠리로 한다.
      httpOnly: true,
      secure: false, //https 를 사용하는지.
    },
  })
);
app.use(flash()); // 로그인 시 '아이디가 틀렸다.', '비밀번호가 틀렸다.','일치하지 않는다.' 등의 1회성 메세지를 표시할때 사용
// 조건에 따라 next() 를 실행할수 있다. 아래 예제 50% 확률로 응답을 하거나. 다음 미들웨어로 넘어간다.
app.use((req, res, next) => {
  console.log('첫번째 미들웨어');
  if (+new Date() % 2 === 0) {
    next();
  } else {
    res.send('50% 당첨');
  }
});
app.use((req, res, next) => {
  console.log('두번째 미들웨어');
  // try {
  //   throw new Error('서버를 고장내주마');
  // } catch (e) {
  //   next(e); // 에러가 발생했을때 다음에 있는 모들 미들웨어를 건너뛰고 에러처리 미들웨어로 가서 500 상테 코드를 보내고 에러를 찍는다.
  // }
  next();
});

// 응답하는 미들웨어도 연결해서 작성할수 있다.
// app.use(
//   (req, res, next) => {
//     console.log('첫번째 미들웨어');
//     next();
//   },
//   (req, res, next) => {
//     console.log('두번째 미들웨어');
//     next();
//   }
// );

app.use('/', indexRouter); // app.js 가 너무 길어 지는 것을 방지하기 위해 분리한다.
app.use('/users', usersRouter); // app.js 가 너무 길어 지는 것을 방지하기 위해 분리한다.

// 4xx 는 클라이언트에서 잘못된 요청을 했을때 발생하는 에러
// 정의하지 않은 경로로 접속했을때 404 처리를 위한 미들웨어
app.use((req, res, next) => {
  res.status('404').send('NOT FOUND');
});

// 5xx 는 정상적인 요청을 서버에서 처리하지 못했을때 발생하는 에러
app.use((err, req, res, next) => {
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.status(err.status || 500);
  console.error(err); // 에러처리 미들웨어는 에러가 뭔지 알아야 하기 때문에 err 변수가 하나 더 들어있다.
  res.status(500).send('SERVER ERROR');
});

module.exports = app;
