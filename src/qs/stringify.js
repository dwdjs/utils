/**
 * 处理参数
 *
 * @export
 * @param {any} params
 * @returns  { string }
 */

import { compactObject } from './compactObject';
// const toISO = Date.prototype.toISOString;

const defaults = {
  delimiter: '&',
  invalid: ['', undefined, null],
  // encode: true,
  // encoder: utils.encode,
  // encodeValuesOnly: false,
  // serializeDate: function serializeDate(date) {
  //   return toISO.call(date);
  // },
  // skipNulls: false,
  // strictNullHandling: false,
};

export function stringify(params, options = {}) {
  const opts = { ...defaults, ...options };
  const { delimiter = defaults.delimiter, invalid = defaults.invalid } = opts;

  const result = [];
  params = compactObject(params, invalid);
  for (const key in params) {
    if ({}.hasOwnProperty.call(params, key)) {
      result.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  }
  return result.join(delimiter);
}
