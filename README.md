# 公共代码库

**TIP**

- 自 `0.2.0` 切换为编译输出到 lib，管理输出更干净
- 删除 `"miniprogram": "./",` 即不再适配小程序引用

常用方法收集

`import { xxx } from @dwdjs/utils;`

- is
  - hasOwn
  - isUnDef
  - isDef
  - isNumber
  - isInteger
  - isString
  - isArray
  - isObject
  - isFunction (alias isFn)
  - isEmptyObject
  - isPromise
  - looseEqual (alias isEqual)
- utils
  - sleep
  - random
  - randomRange
  - uuid
  - forEachValue
  - cached
  - upperFirst
  - kebabCase
  - camelCase
  - merge
  - throttle
  - debounce
  - getPlainNode
- 按需条件加载 js 或 css
  - loadJs
  - loadCss
- date
  - formatDate
  - formatCountDown
- qs 处理 url query-string
  - copy
  - parse
  - stringify
  - compact
  - compactObject
- cache 持久化缓存相关
  - storage
  - cookie
- 其他
  - debug
  - Emitter
  - Version (eq, gt, gte, lt, lte)
  - [ ] forEachObj
  - [ ] deepCopy
  - [ ] find

独立功能方法，需要使用 `@dwdjs/utils/lib/xxx` 路径来引入；

- `import @dwdjs/utils/lib/rem;`
- `import device from '@dwdjs/utils/lib/device';`
- `import @dwdjs/utils/lib/bridge/WebViewJavascriptBridge`
- [ ] `import { Tongji, baidu, piwik } from @dwdjs/utils/lib/tongji;` [用法](./src/tongji/readme.md)
- [ ] `import jsReport from  @dwdjs/utils/lib/report;`
- [ ] `import udesk from  @dwdjs/utils/lib/udesk;`

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
