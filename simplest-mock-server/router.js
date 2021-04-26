const fs = require("fs");
const path = require("path")
const Mock = require("mockjs");
const express = require("express");
const rd = require("rd");
const minimist = require("minimist");

const router = express.Router();

const args = minimist(process.argv.slice(2), {
  string: ["dir"],
  default: { dir: "example" },
});

const TEMPLATE_DIR = path.resolve(__dirname, args.dir);

// { method, pathname, template }，其中 pathname 以 '/' 开头
let routes = [];

// 获取所有 template 文件名
let filelist = ((_) => {
  let res = [];
  rd.eachFileFilterSync(TEMPLATE_DIR, /\.json$/, (f) => {
    res.push(f);
  });
  return res;
})();

// 读取文件内容
filelist.forEach((absolutePath) => {
  console.info(`[INFO] Reading mock template file: ${absolutePath}`);
  try {
    const template = fs.readFileSync(absolutePath, "utf8");
    let name = absolutePath.replace(`${TEMPLATE_DIR}/`, "");
    const idx = name.indexOf("/");
    const method = name.slice(0, idx).toLowerCase();
    name = name.slice(idx);
    const path = name.replace(".json", "").replace(/{/g, ":").replace(/}/g, "");
    const fn = new Function(`return ${template}`);
    routes.push({
      method,
      pathname: path,
      template: fn(),
    });
  } catch (err) {
    console.error(`failed to read mock template file: ${absolutePath}`, err);
  }
});

routes.forEach((item) => {
  const { method, pathname, template } = item;
  const handler = (req, res) => {
    Mock.Handler.function = function (options) {
      options.Mock = Mock;
      options._req = req;
      return options.template.call(options.context.currentContext, options);
    };
    let data = Mock.mock(template);
    if (data._res) {
      // 自定义响应 Code
      let _res = data._res;
      if (_res.status && parseInt(_res.status, 10) !== 200 && _res.data)
        data = _res.data;
      res.status(_res.status || 200);
      delete data["_res"];
    }
    res.jsonp(data);
  };
  router[method](pathname, handler);
  console.info(`[INFO] Add mock api, method: ${method} url: ${pathname}`);
});

// expose routes
router.routes = routes;

module.exports = router;
