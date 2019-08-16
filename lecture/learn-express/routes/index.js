const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// app.get app.post등은 GET, POST 요청들에만 걸리는 미들웨어를 장착한다.
// 주소가 붙으면 그 주소와 일치하는 요청만 걸린다.

// app.js가 너무 길어지는 것을 방지하기 위해 분리
router.get('/', (req, res) => {
  console.log('세 번째 미들웨어');
  res.send('Hello express');
});        // next를 안붙혀서 여기서 끝남

router.post('/', (req, res) => {

});

module.exports = router;

// app.use('/abc') + router.get('/df')
// = GET /abc/df
// app.use('/') + router.post('/')
// = POST /