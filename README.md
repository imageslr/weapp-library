## 在线借书平台

**如果对哪部分代码有疑问或者需要我讲一下设计和开发的整体理念/部分细节，可以开一个Issue。欢迎大家与我交流。**

### 文档
[点击查看](https://imageslr.github.io/weapp-library)

### UI
![ui](./ui.png)

### 组件化
在线借书平台小程序——我的——组件展示

![组件展示](./component.png)

### 运行
参考[文档-安装](https://imageslr.github.io/weapp-library/guide/install.html)

注意：请**更新最新版开发工具**，在`project.config.json`中添加下列字段以**忽略无用文件**，否则会报错“代码包过大”。

```JSON
"packOptions": {
  "ignore": [{
      "type": "file",
      "value": "./ui.png"
  }]
}
```

### 文件结构

```
.
├── apis                  // 网络请求封装
├── app.js
├── app.json
├── app.wxss
├── component-demos       // 组件展示
├── components            // 可复用组件
│   ├── async-button      // 异步按钮
│   ├── async-switch      // 异步切换器
│   ├── collapse          // 可折叠容器
│   ├── load-more         // 加载更多
│   ├── no-data           // 暂无数据
│   ├── panel             // 带导航标题的面板
│   ├── popup             // 底部弹出层
│   ├── rate              // 可评半星的评分组件
│   ├── search-bar        // 带遮罩的搜索框
│   ├── send-code         // 发送验证码按钮
│   ├── spinner           // 加载中动画
│   ├── sticky            // 固定页头
│   ├── sticky-2          // 固定页头的另一种实现
│   ├── tab-bar           // 标签页
│   ├── toast             // 弹出提示
│   └── toptip            // 顶部提示
├── images                // 图标
├── package.json
├── pages                 // 页面，子页面在父页面的children文件夹中
│ └─components            // 与业务相关的特殊组件
├── project.config.json
├── styles                // 样式
├── templates             // 模板
│   ├── library-list      // 图书馆列表
│   ├── page-status-indicator // 页面加载状态，带有一个“重新加载”按钮
│   └── showcase          // 图书项目
└── utils                 // 辅助模块
    ├── biz-helper.wxs    // 业务相关辅助函数，用于wxml中
    ├── constant.js       // 业务常量
    ├── constant.wxs      // 业务常量，用于wxml中
    ├── es6-promise.js    // Promise语法支持
    ├── event.js          // 全局事件
    ├── permission.js     // 登录鉴权
    ├── promise-polyfill.js // Promise.finally()语法
    ├── promisify.js      // 微信小程序API Promise化
    ├── qrcode.js         // 二维码生成
    ├── tip.js            // 使用帮助
    ├── utils.js          // 辅助函数
    ├── validator.js      // 正则校验器
    └── fundebug.js       // 错误监控
```

### 代码规范
遵循 [JavaScript Standard Style](https://standardjs.com/readme-zhcn.html)
