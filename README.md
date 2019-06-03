# 公共代码库

常用方法收集

- @dwdjs/utils
  - forEachObj
  - deepCopy
  - find
  - isObject
  - isPromise
  - uuid
  - throttle
  - debounce
  - upperFirst
  - kebabCase
  - camelCase
  - merge
  - formatDate
  - formatCountDown
- @dwdjs/utils/qs 处理 url query-string
  - parse
  - stringify
  - compact
  - compactObject
- @dwdjs/utils/cache
  - storage
  - cookie
- @dwdjs/utils/tongji
  - Tongji
  - piwik
  - baidu
- @dwdjs/utils/report
- @dwdjs/utils/bridge
  - WebViewJavascriptBridge
- @dwdjs/utils/rem
- @dwdjs/utils/dload
  - loadJs
  - loadCss
- @dwdjs/utils/device
  - device
- @dwdjs/utils/debug
- @dwdjs/utils/emitter
  - Emitter
- version 参见 semver
  - gt
  - gte
  - lt
  - lte
  - eq
  - neq


## Device 设备类型

```js
if (/Mac OS X/.test(navigator.userAgent)) document.documentElement.className += ' plat_osx';
else if (/Linux|FreeBSD/.test(navigator.userAgent)) document.documentElement.className += ' plat_linux';
else document.documentElement.className += ' plat_win';

if (/WOW64|Win64|x86_64/.test(navigator.userAgent)) document.documentElement.className += ' arch_64';
else document.documentElement.className += ' arch_32';
```

## faq

1. `npm run test` 报错

```js
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

参考 https://github.com/facebook/jest/issues/1456

2. `npm publish` 报错

```js
403 Forbidden - PUT http://registry.npmjs.org/dwd-utils - dwd-utils cannot be republished until 24 hours have passed.
```

- npm新的规则：发布过后24h内可以自己手动删除，需要加上 `-f` 参数，参见
- 如果你删除之后再重新发布同名的包，会报如下错误，需要再等24h方可发布

参考 https://github.com/muwenzi/Program-Blog/issues/12

3. `npm run test` 报错

```bash
# 报错误
TypeError: Cannot assign to read only property 'Symbol(Symbol.toStringTag)' of object '#<process>'
```

这里升级 node 版本 11.11.0后引起，可以退回版本11.10.1或升级到11.12.0

```bash
# 报错误
ReferenceError: regeneratorRuntime is not defined
```

调整 `babel.config.js`

支持浏览器版本判断 `.browserslistrc`

需求优先级

P0 - 战略需求
P1 - 重要紧急
P2 - 重要不紧急
P3 - 紧急不重要
