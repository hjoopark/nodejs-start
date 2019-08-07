const crypto = require('crypto');

//sha512를 활용한 pbkdf2암호화 방식
crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('현주바보', salt, 651395, 64, 'sha512', (err, key) => {
        console.log('password', key.toString('base64'));
        console.timeEnd('암호화');
    });
});
//해시 충돌 공격을 어렵게 하기 위해 
//salt(소금)이라는 문자열을 원래 비밀번호에 추가하고
//iteration 횟수를 높입니다.

//salt는 암호화된 비밀번호와 같이 저장하고,
//iteration은 1초 정도가 걸릴때까지 올려주면 좋다.