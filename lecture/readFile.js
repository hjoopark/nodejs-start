const fs = require('fs');
//fs가 프로미스를 10버전에서 지원 그래서 콜백으로
fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});