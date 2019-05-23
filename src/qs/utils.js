/**
 * 间隔 url
 *
 * @export
 * @param {*} url 传入 url 参数
 * @param {string} [paramsStr=''] 分隔符
 * @returns { string } 返回修正的 url
 */
export function urlfix(url, paramsStr = '') {
  let fixUrl = url;
  if (paramsStr) {
    fixUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + paramsStr;
  }
  return fixUrl;
}
