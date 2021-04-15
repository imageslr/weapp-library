// mock相关
// 命令行执行：gulp mock 可以启动mock服务

const path = require("path");
const gulp = require("gulp");
const nodemon = require("gulp-nodemon");

const server = path.resolve(__dirname, "mock");
// 服务器重启
gulp.task("mock", function(cb) {
  // 设个变量来防止重复重启
  var started = false;
  var stream = nodemon({
    script: "./mock/server.js",
    // 监听文件的后缀
    ext: "js json",
    env: {
      NODE_ENV: "development"
    },
    // 监听的路径
    watch: [server]
  });
  stream
    .on("start", function() {
      if (!started) {
        cb();
        started = true;
      }
    })
    .on("crash", function() {
      console.error("application has crashed!\n");
      stream.emit("restart", 10);
    });
});