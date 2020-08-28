const express = require('express');
const multer = require('multer');
const path = require('path');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) { 
            cb(null, 'uploads/')    // cb(에러, 결과값)
        },      // 파일 경로
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },      // 파일명
    }),     // storage: 어디에 저장할지
    limits: { fileSize: 5 * 1024 * 1024 },   // limit: 파일사이즈(바이트단위)
});

// POST /post/img       input id가 img라서
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);  //업로드하면 req.body에 저장이 되어있는데 multer로 업로드한거는 req.file에 저장되어있다.
    res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();   //이미지가 없으면 upload2.none()
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    // 게시글 업로드
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if (hashtags) {
            //findOrCreate = DB에 있으면 찾고 없으면 새로 생성
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },   //#표시 지우고 대소문자 구분 없이
            })));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error); // 에러처리 미들웨어로 넘김
    }

});

router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if(!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query }});
        let posts = [];
        if(hashtag) {
            post = await hashtag.getPosts({ include: [{ model: User }]});
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            user: req.user,
            twits: posts,   //검색 결과를 twits에 넣어준다.
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;