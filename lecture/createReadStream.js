const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
const data = [];

readStream.on('data', (chunck) => {
    data.push(chunck);
    console.log('data', chunck, chunck.length);
});

readStream.on('end', () => {
    console.log('end', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error', err);
})
// 스트림은 이벤트 기반으로 동작합니다. data,end,error...
// 버퍼(청크)들이 들어올 때 마다 data이벤트가 발생합니다.