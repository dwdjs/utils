/**
 * 简单拷贝
 *
 * @param {any} [data=''] 传入非 undefined
 * @returns { Object } 新对象
 */
export function copy(data = null) {
  return JSON.parse(JSON.stringify(data));
}
