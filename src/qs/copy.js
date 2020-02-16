/**
 * 简单拷贝
 *
 * @param {any} [data=''] 传入非 undefined
 * @returns { Object } 新对象
 */
export function copy(data = null) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    return data;
  }
}

export const clone = copy;
export const deepCopy = copy;
