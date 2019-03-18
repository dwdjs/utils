import {
  random,
  uuid,
  randomRange,
  forEachValue,
  upperFirst,
  kebabCase,
  camelCase,
  sleep,
  merge,
} from '../lib';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

// const testStr =
// '_~0123456789' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

test('random', () => {
  expect(random(21).length).toBe(21);
  const t1 = random(100);
  t1.every(item => {
    expect(item).toBeWithinRange(0, 256);
  });
});

test('uuid', () => {
  expect(uuid().length).toBe(21);
  expect(uuid() !== uuid()).toBe(true);
  expect(uuid(32) !== uuid(32)).toBe(true);
  expect(uuid(18) !== uuid(18)).toBe(true);
});

test('randomRange', () => {
  expect(randomRange(1)).toBe(1);
  expect(randomRange(1, 10)).toBeWithinRange(1, 10);
  expect(randomRange(1, 2, 3)).toBe(0);
  // expect(randomRange(1, 2)).toBe(1);
});

test('forEachValue', () => {
  const t1 = { a: 1, b: 2 };
  const r1 = [];
  forEachValue(t1, (item, key) => {
    r1.push(item + key);
  });
  // console.log(r1.join(','));
  expect(r1.join(',')).toBe('1a,2b');
  expect(upperFirst('order-detail')).toBe('Order-detail');
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

it('sleep', async done => {
  const sleepTimes = await sleep(100);
  expect(sleepTimes).toBe(100);
  done();
});

it('merge', async () => {
  const result = JSON.stringify(merge({ a: 1, b: 2 }, { a: 3, c: 4 }));
  expect(result).toBe(`{\"a\":3,\"b\":2,\"c\":4}`);
});
