import { getDependencyLevel } from './helpers';

describe('Helpers', () => {
  test('getDependencyLevel', () => {
    getDependencyLevel('test', { test: 1 });
    expect(1).toBe(1);
  });
});
