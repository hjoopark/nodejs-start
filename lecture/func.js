//사용할 변수들을 불러오면 된다.
//비구조화 할당
//const변수 = require('파일경로')
const {odd, even} = require('./var');

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}


module.exports = checkOddOrEven;

//module.exports에서는 객체리터럴 뿐만 아니라 함수나 string을
//내보낼 수도 있다. 내보내고싶은거 아무거나