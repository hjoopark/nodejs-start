const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// router.get(미들웨어1, 미들웨어2, 미들웨어3)
// POST /auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.find({ where: { email } });
        if (exUser) {       // 가입된 이메일이 있으면
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        // 이메일이 없으면
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
router.post('/login', isNotLoggedIn, (req, res, next) => { // req.body.email, req.body.password
    passport.authenticate('local', (authError, user, info) => {
    if (authError) {
        console.error(authError);
        return next(authError);
    }
    if (!user) {
        req.flash('loginError', info.message);
        return res.redirect('/');
    }
    return req.login(user, (loginError) => {    // req.user에서 사용자 정보를 찾을 수 있다.
        if (loginError) {
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
    req.session.destroy();
    res.redirect('/');
});

//(1)
// GET /auth/kakao 이거면 kakaoStrategy로 연결되게 해야함
router.get('/kakao', passport.authenticate('kakao'));
// 이렇게 하면 kakaoStrategy가 실행이 된다.

//(3)
// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',   // 카카오로그인 실패했으면 메인라우터로 되돌아가게 함
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;