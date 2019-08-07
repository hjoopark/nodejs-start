const url = require('url');

const URL = url.URL;
const myURL = new URL('https://www.inflearn.com/course/node-js-%EA%B5%90%EA%B3%BC%EC%84%9C/lecture/14388');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('--------------------------');
const parseUrl = url.parse('https://www.inflearn.com/course/node-js-%EA%B5%90%EA%B3%BC%EC%84%9C/lecture/14388');
console.log('url.parse():', parseUrl);
//기존 방식 (url.parse)은 호스트가 없을 때도 쓸 수 있습니다.
//WHATWG방식(url.URL)은 search처리가 편리합니다.

//노드 searchParams의 메서드는 FormData나 URLSearchParams객체에도 비슷하게 쓰인다.
//append는 값 추가 (기존 값 보존)
//set은 기존 값 초기화 후 수정