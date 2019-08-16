const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app2 = express();     // express에서 app.js가 중앙 통제실

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');  // html을 대체하는 엔진 pug

app2.use(logger('dev'));
app2.use(express.static(path.join(__dirname, 'public')));
// static 미들웨어는 정적파일용 라우터 역할을 합니다.
// 원래는 next가 없고 원하는 파일이 없을 때 next
app2.use(express.json());
app2.use(express.urlencoded({ extended: false }));
app2.use(cookieParser('secret code'));   // cookie를 파싱해주는 미들웨어
// secret code 와 같은 비밀 키로 서버가 저장하라고 한 쿠키인지 위조된 쿠키인지 확인할 수 있다.
app2.use(session({
    resave: false,      // 세션 객체에 수정 사항이 없더라도 저장을 할지
    saveUninitialized: false,   // 처음의 빈 세션 객체라도 저장을 할지,
    secret: 'secret code',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app2.use(flash());

// app.use 안의 req, res로 요청과 응답을 조작할 수 있다.
// next로 다음 미들웨어로 넘어갈 수 있다.
app2.use((req, res, next) => {
    console.log('첫 번째 미들웨어');
    next();
}, (req, res, next) => {
    console.log('두 번째 미들웨어');
    next();
});

app2.use('/', indexRouter);
app2.use('/users', indexRouter);

// 404 NOT FOUND     클라이언트에서 에러가 발생
app2.use((req, res, next) => {
    res.status(404).send('NOT FOUND');
});
//express에서는 writeHead(404) 대신 status(404)를 쓴다..

// 500 ERROR      서버에서 발생하는 에러
// error handler
app2.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
});

module.exports = app2;