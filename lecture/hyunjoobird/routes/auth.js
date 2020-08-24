const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// router.get(미들웨어1, 미들웨어2, 미들웨어3) 순서로 진행되는데 여기서는
// isNotLoggedIn 미들웨어가 먼저 실행되고 다음 미들웨어가 실행되도록 된다.
// POST /auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.find({ where: { email }});
        if (exUser) {       // 가입된 이메일이 있으면
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        // 이메일이 없으면
        // bcrypt로 비밀번호를 암호화 한다. 숫자가 커질 수록 복잡하게 암호화 된다.
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST /auth/login
router.post('/login',(req, res, next) => { // req.body.email, req.body.password
    // localStrategy.js의 done(에러, 성공, 실패)가 아래 (authError, user, info)로 전달 된다.
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {        //에러일때
            console.error(authError);
            return next(authError);
        }
        if (!user) {            //로그인 실패일때
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        //로그인 성공일 때
        // req.login = passport로 추가해줌
        return req.login(user, (loginError) => {    // req.user에서 사용자 정보를 찾을 수 있다.
            if (loginError) {   //혹시나 에러가 날 수도 있으니 loginError를 걸어준다.
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
        })(req, res, next);
});

// GET /auth/logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();      // 세션을 지운다,(다른 세션도 같이 지워진다)
    res.redirect('/');
});


module.exports = router;