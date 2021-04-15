const express = require('express')
const logger = require('morgan')

const port = 3000;
const server = express()
const router = require("./router.js")

// 添加一个 750ms 的延迟，模拟真实场景
server.use((request, res, next) => {
  setTimeout(next, 750); 
});

server.use(logger('dev', {
  skip: (req) =>
    process.env.NODE_ENV === 'test' || req.path === '/favicon.ico',
}))

server.use(router);

server.listen(port, () => {
  console.log("open mock server at localhost:" + port);
});

