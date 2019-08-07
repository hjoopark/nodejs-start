const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('https://www.inflearn.com/course/node-js-%EA%B5%90%EA%B3%BC%EC%84%9C/lecture/14388');
const query = querystring.parse(parsedUrl.query);

console.log('querystring.parse():', query);