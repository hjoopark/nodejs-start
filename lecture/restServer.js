const http = require('http');
const fs = require('fs');

const users = {};
//rest api에서 주소(자원)에 대한 메서드가 달라질 수 있다.

const router = {
    get: {
        '/': (req, res) => {    //루트로 들어오면 html파일 읽어주기
            fs.readFile('./restFront.html', (err, data) => {
                if (err) {
                  throw err;
                }
                res.end(data);
              });
        },
        '/users': () => {
             res.end(JSON.stringify(users));    //users가 객체라서 JSON으로 감싸서 보내준다.
        },
        '*': (req, res) => {
            fs.readFile(`.${req.url}`, (err, data) => {
                if (err) {
                  res.writeHead(404, 'NOT FOUND');
                  return res.end('NOT FOUND');
                }
                return res.end(data);
            });
        },
    },
    post: {
        '/users': (req, res) => {
            let body = '';
            req.on('data', (data) => {    //readStream처럼 요청을 stream으로 읽어준다. 
                body += data;
            });
            return req.on('end', () => {
                console.log('POST 본문(Body):', body);
                const { name } = JSON.parse(body);
                const id = Date.now();
            users[id] = name;
            res.writeHead(201);
            res.end('등록 성공');
            });
        }
    },
    patch: {

    },
    put: {
        '/users': () => {
            const key = req.url.split('/')[2];    //숫자부분만 떼어오기
            let body = '';
            req.on('data', (data) => {        // 본문에 바꿀 데이터를 가져오기
                body += data;
            });
            return req.on('end', () => {
                console.log('PUT 본문(Body):', body);
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        },
    },
    delete: {
        '/users': () => {
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        },
    },
};
const server = http.createServer((req, res) => {
    const matchedUrl = router[req.method.toLowerCase()][req.url]    //[요청][주소]
    (matchedUrl || router[req.method.toLowerCase()]['*'])(req, res);
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기중입니다');
});

  //listen은 서버가 종료되지 않고 유지될 수 있도록 하는 장치
