const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다.');
},3000);

setTimeout(()=> {
    clearTimeout(timeout2);
    clearInterval(interval);
},2500);

// 즉시 실행되는 setImmediate함수를 이벤트 루프로 보낼때 사용
const im = setImmediate(() => console.log('즉시 실행'));
clearImmediate(im);

//process객체에는 현재 실행중인 노드 프로그램 정보가 들어있다.
//node로 데스크탑 프로그램을 돌릴 때 process객체 사용