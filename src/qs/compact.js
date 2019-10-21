/**
 * Creates an array with all false values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are false.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @param {Array} invalid 过滤无效值，默认 ['', 0, undefined, false, NaN]
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
export function compact(array, invalid = ['', 0, undefined, false, NaN]) {
  let resIndex = 0;
  const result = [];

  /* eslint eqeqeq: 0 */
  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (!invalid.includes(value)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

// const test1 = [1, 'test', '', 0, undefined, false, null, NaN];
// console.log(compact(test1, [0, undefined, false]));
