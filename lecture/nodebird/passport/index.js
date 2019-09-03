const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User }  = require('../models');
// strategy = 누구를 로그인 시킬 것인가

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        // 사용자 정보를 세션에 id만 저장
        // { id:1, name: zero, age: 25 } -> 1
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        // id를 DB조회 후 req.user로
        // 1 -> { id:1, name: zero, age: 25 } -> req.user
        if (user[id]) {
            done(user[id]);
        } else {
            User.find({ where: { id } })
                .then(user => done(null, user))
                .catch(err => done(err));
        }
    });

    local(passport);
    //kakao(passport);
};