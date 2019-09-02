#!/usr/bin/env node
//console.log('Hello CLI', process.argv);
//process.argv는 사용자가 입력한 내용을 배열로 출력해준다
//process.arg[0]: 노드 설치 경로
//process.arg[0]: 파일 위치 경로

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('감사합니다!');
        rl.close();
    } else if (answer === 'n') {
        console.log('죄송합니다!');
        rl.close();
    } else {
        console.clear();
        console.log('y 또는 n만 입력하세요.');
        rl.question('예제 재밌습니까? (y/n)', answerCallback);
    }
};
rl.question('예제 재밌습니까? (y/n)', answerCallback);