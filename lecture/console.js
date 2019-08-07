//console 객체 안에 디버깅을 도와주는 많은 메서드가 있습니다.
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};

console.time('전체 시간'); //성능을 알 수 있다

console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);

console.error('에러 메시지는 console.error에 담아주세요');

console.dir(obj, { colors:true, depth: 2 });
console.dir(obj, { colors:true, depth: 1 });
// console.time('인자')
// console.timeEnd('인자')
// 인자가 같아야 그 사이의 시간을 잽니다.
console.time('시간 측정');
for (let i=0; i<100000; i++) {
    continue;
}
console.timeEnd('시간 측정');

//console.trace()로 호출 스택을 추적할 수 있다.
function b() {
    console.trace('에러 위치 추적');
}
function a() {
    b();
}
a();

console.timeEnd('전체 시간');