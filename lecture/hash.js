const crypto = require('crypto');

console.log(crypto.createHash('sha512').update('비밀번호').digest('base64'));
//sha512라는 알고리즘으로 '비밀번호'를 암호화하고, base64로 보여준다.