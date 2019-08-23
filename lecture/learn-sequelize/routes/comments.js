const express = require('express');
const router = express.Router();
const { User, Comment } = require('../models');

// GET /comment
// GET /comment/5
// 주소에서 변화되는 부분을 :id로 넣어줄 수 있다.
// /comments/hello 와 /comments/:id
// 두 가우터가 있다면 와일드 카드 라우터가 더 뒤에 있어야한다.
router.get('/:id', (req, res, next) => {
    Comment.findAll({
        include: {      // include: 모델 간의 관계 연결
            model: User,    // model: 어떤 모델인지 지정
            where: { id: req.params.id }    // where: 쿼리 조건 설정
        }
    })
        .then((comments) => {
            console.log(comments);
            res.json(comments);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});

router.patch('/:id', (req, res, next) => {
    Comment.update({
        comment: req.body.comment,
    }, {
        where: { id: req.params.id },
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.post('/', (req, res, next) => {
    Comment.create({
        commeter: req.body.id,
        comment: req.body.comment,
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