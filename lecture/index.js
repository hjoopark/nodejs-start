//모듈은 여러 번 재사용 될 수 있습니다.
//var.js는 func.js와 index.js에서 사용됩니다.
const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
console.log(global);    //노드의 전역객체는 global
//전역객체는 어디에서나 접근 가능한
