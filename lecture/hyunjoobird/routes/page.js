const express = require('express');
const router = express.Router();

//프로필 페이지
router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird', user: null });
  });
  
  //회원가입 페이지
  router.get('/join', (req, res) => {
    res.render('join', {
      title: '회원가입 - NodeBird',
      user: req.user,
      joinError: req.flash('joinError'),  //1회성 에러 보여주기 위해 넣음
    });
  });

// 메인페이지
router.get('/',(req, res, next) => {
  res.render('main', {
    title: 'hyunjooBird',
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
  });
});

module.exports = router;