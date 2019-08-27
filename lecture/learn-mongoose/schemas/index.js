const mongoose = require('mongoose');

module.exports = () => {
    //중복 방지를 위해 함수로 묶어주기
    const connect = () =>{
        mongoose.connect('mongodb://user:root@localhost:27017/admin', {
            dbName: 'nodejs',
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', (error) => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });

    require('./user');
    require('./comment');
};

// index 부분이 db 모델 부분의 핵심이기 때문에
// express와 몽고디비를 연결하는 코드를 작성