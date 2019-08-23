var express = require('express');
var router = express.Router();
var { User } = require('../models');

// create 생성하기
// findAll 모두 찾기
// find 하나만 찾기
// 모두 Promise 지원 메서드
/* GET users listing. */
router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

// POST /users
router.post('/', (req, res, next) => {
  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
