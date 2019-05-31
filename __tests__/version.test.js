import Version from '../src/version';

const version = new Version('3.8.5');

test('gt', () => {
  expect(version.gt('3.7.6')).toBe(true);
  expect(version.gt('3.8.6')).toBe(false);
});

test('gte', () => {
  expect(version.gte('3.7')).toBe(true);
  expect(version.gte('3.7.6')).toBe(true);
  expect(version.gte('3.8.5')).toBe(true);
  expect(version.gte('3.9')).toBe(false);
});

test('lt', () => {
  expect(version.lt('3.8.6')).toBe(true);
  expect(version.lt('3.9')).toBe(true);
  expect(version.lt('3.7')).toBe(false);
});

test('lte', () => {
  expect(version.lte('3.9')).toBe(true);
  expect(version.lte('4')).toBe(true);
  expect(version.lte('4.0.0')).toBe(true);
  expect(version.lte('3.8')).toBe(false);
});

test('eq', () => {
  expect(version.eq('3.8.5')).toBe(true);
  expect(version.eq('3.8')).toBe(true);
  expect(version.eq('3')).toBe(true);
  expect(version.eq('3.8.1')).toBe(false);
});
