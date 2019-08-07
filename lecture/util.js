const util = require('util');
const crypto = require('crypto');

//deprecated는 지원이 조만간 중단될 메서드임을 알려줄 때 사용
const dontuseme = util.deprecate((x,y)=>{
    console.log(x+y);
});

dontuseme(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('현주바보', salt, 651395, 64, 'sha512', (err, key) => {
        console.log('password', key.toString('base64'));
        console.timeEnd('암호화');
    });
});

//promise를 지원하지 않는 (err, data) => {} 꼴의 콜백은
//util.promisify로 프로미스로 만들 수 있다.

randomBytesPromise(64)
    .then((buf) => {
        const salt = buf.toString('base64');
        return pbkdf2Promise('현주바보', salt, 651395, 64, 'sha512');
    })
    .then((key) => {
        console.log('password', key.toString('base64'));
    })
    .catch((err) => {
        console.error(err);
    });

    (async()=> {
        const buf = await randomBytesPromise(64);
        const salt = buf.toString('base64');
        const key = await pbkdf2Promise('현주바보', salt, 651395, 64, 'sha512');
        console.log('password', key.toString('base64'));
    })();