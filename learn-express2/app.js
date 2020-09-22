var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use((req, res, next) => {
  //간결함은 포기하지만 다른 기능을 추가해서 기능을 확장할 수 있다.
  express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  req.render('error');
  // 변수는 render메서드의 두번째 인자에 객체로 넣어 줬다. 그러나 이에서 처럼 res.locals 안에 넣어도 된다
  // res.locals 에 넣었을 경우 장점은 에러처리 미들웨어가 아닌 다른 미들웨어 에서 값을 넣어줘도 렌더링 될때 값이 전달된다.
});

module.exports = app;
