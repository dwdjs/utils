// 日期相关格式处理

/**
 * 添加前缀 0
 *
 * @export
 * @param {number} n 传入数字
 * @returns {string} 返回数字或字符串
 */
export function formatNum(n) {
  if (n < 10) return '0' + n;
  return n;
  // return n > 10 ? n : ('0' + n)
}

console.log(formatNum(1));

/**
 * formatCountDown(times, 'D天H:F:S')
 *
 * @export
 * @param {*} times 传入毫秒数
 * @param {string} [format='H:F:S'] 倒计时时间格式
 * @returns {string} 返回倒计时
 */
export function formatCountDown(times, format = 'H:F:S') {
  let time = parseInt(times * 0.001, 10);

  const seconds = time % 60;
  time = parseInt(time / 60, 10);
  const minutes = time % 60;
  time = parseInt(time / 60, 10);
  const hours = parseInt(time % 24, 10);
  const days = parseInt(time / 24, 10);

  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, a => {
    /* eslint indent: 0 */
    switch (a) {
      case 'd':
        return days;
      case 'D':
        return formatNum(days);
      case 'h':
        return hours;
      case 'H':
        return formatNum(hours);
      case 'f':
        return minutes;
      case 'F':
        return formatNum(minutes);
      case 's':
        return seconds;
      case 'S':
        return formatNum(seconds);
      default: // do nothing...
    }
  });
}

/**
 * 日期格式化 formatDate(date, 'Y年M月D日')
 *
 * @export
 * @param {*} date 传入时间戳
 * @param {string} [format='Y年M月D日'] 日期格式
 * @returns {string} 返回日期
 */
export function formatDate(date, format = 'Y年M月D日') {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, a => {
    /* eslint indent: 0 */
    switch (a) {
      case 'y':
        return (date.getFullYear() + '').slice(2);
      case 'Y':
        return date.getFullYear();
      case 'm':
        return date.getMonth() + 1;
      case 'M':
        return formatNum(date.getMonth() + 1);
      case 'd':
        return date.getDate();
      case 'D':
        return formatNum(date.getDate());
      case 'h':
        return date.getHours();
      case 'H':
        return formatNum(date.getHours());
      case 'f':
        return date.getMinutes();
      case 'F':
        return formatNum(date.getMinutes());
      case 's':
        return date.getSeconds();
      case 'S':
        return formatNum(date.getSeconds());
      default: // do nothing...
    }
  });
}
