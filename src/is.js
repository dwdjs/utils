/*!
 * 类型判断
 *
 * 整理参考
 * https://github.com/vuejs/vue/blob/dev/src/shared/util.js
 * https://github.com/enricomarino/is
 */

/**
 * 常用类型判断
 * 是否定义 字符串 数字 纯对象 空对象 数组 函数
 */

const objProto = Object.prototype;
const owns = objProto.hasOwnProperty;
const toString = objProto.toString;

export function isUnDef(v) {
  return v === 'undefined' || v === null;
}

export function isDef(v) {
  return v !== 'undefined' && v !== null;
}


export function isNumber(v) {
  return toString.call(v) === '[object Number]';
}

export function isString(v) {
  return toString.call(v) === '[object String]';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isObject(v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) === false;
}

export function isFunction(v) {
  var isAlert = typeof window !== 'undefined' && v === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toString.call(v);
  return (
    str === '[object Function]' ||
    str === '[object GeneratorFunction]' ||
    str === '[object AsyncFunction]'
  );
}

export const isFn = isFunction;

// 对象自身属性中是否具有指定的属性
export function hasOwn(obj, prop) {
  return owns.call(obj, prop);
}

export function isEmptyObject(v) {
  return JSON.stringify(v) === '{}';
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}
