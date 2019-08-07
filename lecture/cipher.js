const crypto = require('crypto');

const cipher = crypto.createCipher('aes-256-cbc', '열쇠');
let result = cipher.update('현주바보', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호', result);
//createCipher
//utf8평문을 base64 암호문으로

//createDecipher
//base64암호문을 utf8평문으로
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');
let result2 = decipher.update(result, 'base64', 'utf8');    //암호화와 반대
result2 += decipher.final('utf8');
console.log('평문', result2);