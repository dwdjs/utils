import { stringify } from '../../src/qs';

const result1 = 'from=singlemessage&isappinstalled=0&id=646156&platform=5';
const test1 = {
  from: 'singlemessage',
  isappinstalled: '0',
  id: '646156',
  platform: '5',
};
const result2 = 'activityId=1';
const test2 = {
  activityId: '1',
};

describe('stringify', () => {
  test('test1', () => {
    const result = stringify(test1);
    expect(JSON.stringify(result)).toBe(JSON.stringify(result1));
  });
  test('test2', () => {
    const result = stringify(test2);
    expect(JSON.stringify(result)).toBe(JSON.stringify(result2));
  });
});
