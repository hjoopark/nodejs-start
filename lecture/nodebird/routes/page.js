const express = require('express');

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

//프로필 페이지
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: null });
});

//회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
    user: req.user,
    joinError: req.flash('joinError'),  //1회성 에러 보여주기 위해 넣음
  });
});

router.get('/', (req, res, next) => {
  Post.findAll({
    include: {    // include로 연결을 해주고 id,nick 가져옴
      model: User,
      attributes: ['id', 'nick'],
    },
  })
    .then((posts) => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((error)=> {
      console.error(error);
      next(error);
    });
  
});

module.exports = router;