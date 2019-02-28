# 小型公共库

常用方法收集

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
- version 参见 semver
  - gt
  - gte
  - lt
  - lte
  - eq
  - neq
- formatDate
- formatCountDown

## faq

`npm run test` 报错

```js
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

参考 https://github.com/facebook/jest/issues/1456
