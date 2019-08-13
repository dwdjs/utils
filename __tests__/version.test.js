import { Version } from '../src';

const v = '3.8.5';
const version = new Version(v);
const v2 = new Version('3.0.0');
const v3 = new Version('3.0');

test('eq', () => {
  expect(version.eq(v)).toBe(true);
  expect(version.eq('3.8')).toBe(true);
  expect(version.eq('3')).toBe(true);
  expect(version.eq('3.8.1')).toBe(false);
});
test('gt', () => {
  expect(version.gt(v)).toBe(false);
  expect(version.gt('3.7.6')).toBe(true);
  expect(version.gt('3.8.6')).toBe(false);
});

test('gte', () => {
  expect(version.gte('3.7')).toBe(true);
  expect(version.gte('3.7.6')).toBe(true);
  expect(version.gte('3.8')).toBe(true);
  expect(version.gte(v)).toBe(true);
  expect(version.gte('3.9')).toBe(false);
  expect(v2.gte('3.0.0')).toBe(true);
  expect(v2.gte('3.0')).toBe(true);
  expect(v3.gte('3.0.0')).toBe(true);
  expect(v3.gte('3.0')).toBe(true);
});

test('lt', () => {
  expect(version.lt(v)).toBe(false);
  expect(version.lt('3.8.6')).toBe(true);
  expect(version.lt('3.9')).toBe(true);
  expect(version.lt('3.7')).toBe(false);
});

test('lte', () => {
  expect(version.lte(v)).toBe(true);
  expect(version.lte('3.9')).toBe(true);
  expect(version.lte('4')).toBe(true);
  expect(version.lte('4.0.0')).toBe(true);
  expect(version.lte('3.8')).toBe(false);
});

test('valueOf', () => {
  expect(+version).toBe(3.8);
  expect(!version).toBe(false);
  expect(0 + version).toBe(3.8);
  expect(1 + version).toBe(4.8);
  expect('' + version).toBe('3.8');
  expect('1' + version).toBe('13.8');
  expect(version + '1').toBe('3.81');
});
test('toString', () => {
  expect(version.toString()).toBe(v);
});
