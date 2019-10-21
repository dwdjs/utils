# 日志/错误上报 report

实现 js 错误上报，可用于以下场景

- [ ] web
- [ ] vue
- [ ] 小程序

**注意：** window.onerror能捕捉到语法错误，但是语法出错的代码块不能跟window.onerror在同一个块（语法都没过，更别提window.onerror会被执行了）

需要让此代码先执行，尽早的引用

## 安装

```bash
npm install report
```

## 使用

```js
import report from "@dwdjs/utils/report";

// 跟 vue 不相干的报错实现
report.init({
  // 过滤
  filters: [{
    name: /^ReferenceError$/,
    message: /WeixinJSBridge is not defined/,
    // message: /window\.local_obj/,
  }],
  reportURI: 'https://tongji.doweidu.com/log.php', // 上报 url 信息
  appName: 'xxx', // 平台项目标识
  systemInfo: {}, // 系统信息
});

// 使用
report.notifyError(err);
report.notify('test', '测试是否通顺');
```

参考：

- [监控 Vue.js](https://docs.fundebug.com/notifier/javascript/framework/vuejs.html)
- [前端代码异常监控](http://rapheal.sinaapp.com/2014/11/06/javascript-error-monitor/)
- [【数据可视化之采集】如何设计一个前端监控系统](https://www.cnblogs.com/yexiaochai/p/6246490.html)
