const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

// (2) (4)
module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,       // 카카오 앱 아이디
        callbackURL: '/auth/kakao/callback',    // 카카오 리다이렉트 주소
    }, async (accessToken, refreshToken, profile, done) => {
        //sns로그인은 token 기반으로 로그인을 한다.
        try {

            const exUser = await User.find({
                where: {
                    snsId: profile.id,
                    provider: 'kakao',
                },
            });
            if (exUser) {
                done(null, exUser);
            } else {
                // 로그인은 카카오가 대신 처리해주지만
                // 내 디비에도 사용자를 저장(snsId, provider 사용)
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
};