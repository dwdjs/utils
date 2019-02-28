import {
  randomRange,
  upperFirst,
  kebabCase,
  camelCase,
  sleep,
  merge,
} from '../lib';

// const testStr =
// '_~0123456789' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

test('randomRange', () => {
  expect(randomRange(1)).toBe(1);
  // expect(randomRange(1, 2)).toBe(1);
});

// 首字母大写
test('upperFirst', () => {
  expect(upperFirst('abc')).toBe('Abc');
  expect(upperFirst('order-detail')).toBe('Order-detail');
});

// kebabCase 连字符命名 eg: kebab-case
test('kebabCase', () => {
  expect(kebabCase('abc')).toBe('abc');
  expect(kebabCase('orderDetail')).toBe('order-detail');
});

// camelCase 小驼峰命名
test('camelCase', () => {
  expect(camelCase('abc')).toBe('abc');
  expect(camelCase('order-detail')).toBe('orderDetail');
});

it('sleep', async (done) => {
  const sleepTimes = await sleep(100);
  expect(sleepTimes).toBe(100);
  done();
});

it('merge', async () => {
  const result = JSON.stringify(merge({ a: 1, b: 2 }, { a: 3, c: 4 }));
  expect(result).toBe(`{\"a\":3,\"b\":2,\"c\":4}`);
});
