import { formatNum, formatCountDown, formatDate } from '../lib';

test('formatNum', () => {
  expect(formatNum(0)).toBe('00');
  expect(formatNum(1)).toBe('01');
  expect(formatNum(11)).toBe(11);
  expect(formatNum('')).toBe('0'); // error?
  expect(formatNum('0')).toBe('00');
  expect(formatNum('1')).toBe('01');
  expect(formatNum('123')).toBe('123');
});

test('formatCountDown', () => {
  expect(formatCountDown(10000)).toBe('00:00:10');
  const times = (86400 * 3 + 3600 * 5 + 32 * 60 + 12) * 1000;
  expect(formatCountDown(times)).toBe('05:32:12');
  expect(formatCountDown(times, 'd天H时F分S秒')).toBe('3天05时32分12秒');
  expect(formatCountDown(times, 'h:f:s')).toBe('5:32:12');
});

test('formatDate', () => {
  // Date.now();
  const date = +new Date('2018-12-17 19:04:09');
  expect(formatDate('' + date)).toBe(undefined);
  expect(formatDate(date)).toBe('2018年12月17日');
  expect(formatDate(date, 'M-D')).toBe('12-17');
  expect(formatDate(date, 'Y-M-D H:F:S')).toBe('2018-12-17 19:04:09');
  expect(formatDate(date, 'y-m-d h:f:s')).toBe('18-12-17 19:4:9');
});
