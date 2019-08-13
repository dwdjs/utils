// 轻量级语义版本比较
export function compare(v1, v2, complete) {
  v1 = String(v1);
  v2 = String(v2);
  if (v1 === v2) return 0;
  const v1s = v1.split('.');
  const v2s = v2.split('.');
  const len = Math[complete ? 'max' : 'min'](v1s.length, v2s.length);
  for (let i = 0; i < len; i++) {
    v1s[i] = 'undefined' === typeof v1s[i] ? 0 : parseInt(v1s[i], 10);
    v2s[i] = 'undefined' === typeof v2s[i] ? 0 : parseInt(v2s[i], 10);
    if (v1s[i] > v2s[i]) {
      return 1;
    }
    if (v1s[i] < v2s[i]) {
      return -1;
    }
  }
  return 0;
}
/**
 * 版本判断
 * new Version("6.1").eq(6); // true.
 * new Version("6.1.2").eq("6.1"); // true.
 *
 * @export
 * @class Version
 */
export class Version {
  constructor(version, comparatorFunction) {
    this._version = String(version);
    this.delimiter = '.';
    if (comparatorFunction) {
      this.compare = comparatorFunction;
    }
  }
  compare(v1, v2, bool = true) {
    return compare(v1, v2, bool);
  }
  // .eq("6.1", "6"); // true.
  // .eq("6.1.2", "6.1"); // true.
  eq(v1, v2 = this._version) {
    return this.compare(v2, v1, false) === 0;
  }
  gt(v1, v2 = this._version) {
    return this.compare(v2, v1, true) > 0;
  }
  gte(v1, v2 = this._version) {
    return this.compare(v2, v1, true) >= 0;
  }
  lt(v1, v2 = this._version) {
    return this.compare(v2, v1, true) < 0;
  }
  lte(v1, v2 = this._version) {
    return this.compare(v2, v1, true) <= 0;
  }
  // https://blog.csdn.net/x_jagger/article/details/73430959
  // 当需要返回对象的原始值而非字符串的时候调用valueOf()方法，尤其是转换为数字的时候。
  // valueOf()方法是Object的原型方法，每个对象都具有该方法。
  // 当（函数/object/数组）用+连接一个字符串或者是数字的时候，如果我们没有重新定义valueOf和toString，其隐式转换会调用默认的toString()方法，将函数本身内容作为字符串返回；
  // 如果我们自己重新定义toString/valueOf方法，那么其转换会按照我们的定义来，其中valueOf比toString优先级更高
  // 但如果这个对象是Date，则都调用toString();
  valueOf() {
    const { delimiter } = this;
    return parseFloat(
      this._version
        .split(delimiter)
        .slice(0, 2)
        .join(delimiter),
      10
    );
  }
  /**
   * TIP: '' + version 调用的转型方法是 valueOf，而不是 toString(重新定义valueOf比toString优先级更高)。
   * 这里只能使用 String(ver) 或 ver.toString() 来调用。
   * @param {Number} precision, 返回的版本号精度。默认返回完整版本号。
   * @return {String} string
   */
  toString(precision) {
    const { delimiter } = this;
    return 'undefined' === typeof precision
      ? this._version
      : this._version
          .split(delimiter)
          .slice(0, precision)
          .join(delimiter);
  }
}
