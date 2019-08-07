const path = require('path');
console.log(path.dirname(__filename));   //경로
//C:\Users\hjoo_\Documents\nodejs-start\lecture

console.log(path.extname(__filename));   //확장자
//.js

console.log(path.basename(__filename));  //파일명
//path.js

console.log(path.parse(__filename));    //분해를 해준다
// { root: 'C:\\',
//   dir: 'C:\\Users\\hjoo_\\Documents\\nodejs-start\\lecture',
//   base: 'path.js',
//   ext: '.js',
//   name: 'path' }

console.log(path.format({           //다시 합쳐준다
    root: 'C:\\',
    dir: 'C:\\Users\\hjoo_\\Documents\\nodejs-start\\lecture',
    base: 'path.js',
    ext: '.js',
    name: 'path'
}));

//알아서 경로를 제대로 만들어줌
console.log(path.normalize('C:\\Users\\\hjoo_//Documents\//nodejs-start\\\lecture\\\path.js'));

//절대경로인지 상대경로인지 알려줌
console.log(path.isAbsolute('../'));

//첫번째에서 두번째로 가는 상대경로를 보여줌
console.log(path.relative('C:\\Users\\hjoo_\\Documents\\nodejs-start\\lecture','C:\\'));

//path.join 절대 경로 무시하고 합침
console.log(__dirname);
console.log(path.join(__dirname, '..','..','/users','.','/zerocho'));

//path.resolve 절대경로 고려하고 합침 루트는 C:\
console.log(path.resolve(__dirname, '..','..','/users','.','/zerocho'));