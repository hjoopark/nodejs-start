var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// app.set
// 익스프레스 설정 또는 값 저장 (값 저장은 나중에 사용해요)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');  // html을 대체하는 엔진 pug

// app.use
// 미들웨어 장착
// express는 미들웨어가 핵심
// 요청(req) -> 미들웨어(app.use) -> 응답(res)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
