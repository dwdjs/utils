import { compactObject } from '../../src/qs';

const test1 = {
  from: 'singlemessage',
  isappinstalled: '0',
  t1: 1,
  t2: 'test',
  t3: '',
  t4: undefined,
  t5: false,
  t6: null,
  t7: NaN,
  t8: -0,
};
const result1 = {
  from: 'singlemessage',
  isappinstalled: '0',
  t1: 1,
  t2: 'test',
  t5: false,
  t7: NaN,
  t8: -0,
};

describe('compactObject', () => {
  test('test1', () => {
    const result = compactObject(test1);
    expect(JSON.stringify(result)).toBe(JSON.stringify(result1));
  });
});
