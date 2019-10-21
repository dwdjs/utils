import { compact } from '../../src';

// 默认
// filter1 =  ['', 0, undefined, false, NaN]
const test1 = [1, 'test', '', 0, -0, +0, undefined, false, null, NaN];
const result1 = [1, 'test', null];

const filter2 = [null, NaN];
const result2 = [1, 'test', '', 0, -0, +0, undefined, false];

const filter3 = [0, undefined, false];
const result3 = [1, 'test', '', null, NaN];

describe('compact', () => {
  test('test1', () => {
    const result = compact(test1);
    expect(JSON.stringify(result)).toBe(JSON.stringify(result1));
  });

  test('test2', () => {
    const result = compact(test1, filter2);
    expect(JSON.stringify(result)).toBe(JSON.stringify(result2));
  });

  test('test3', () => {
    const result = compact(test1, filter3);
    expect(JSON.stringify(result)).toBe(JSON.stringify(result3));
  });
});
