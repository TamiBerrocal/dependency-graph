import {
  getDependencyLevel,
  setDependenciesLevel,
  getDependencyGraphLevels,
} from './helpers';

describe('Helpers', () => {
  const id = 'test';
  const dependencies = {
    app: ['otherApp'],
    test: ['app'],
  };

  describe('getDependencyLevel', () => {
    const levels = {
      test: 1,
    };

    test('should return the level of the dependency when it is registered in the dictionary', () => {
      expect(getDependencyLevel(id, levels)).toBe(1);
    });

    test('should return -1 when it is not registered in the dictionary', () => {
      const notRegisteredId = 'notRegisteredId';
      expect(getDependencyLevel(notRegisteredId, levels)).toBe(-1);
    });
  });

  describe('setDependenciesLevel', () => {
    let componentsLevel = {};
    let sequence = {};
    let circularDependency: Array<string> = [];

    beforeEach(() => {
      componentsLevel = {
        test: 0,
      };
      sequence = {
        test: 0,
      };
      circularDependency = [];
    });

    test("should not set any component level if the given component doesn't have dependencies", () => {
      setDependenciesLevel(
        id,
        {},
        componentsLevel,
        sequence,
        circularDependency
      );

      expect(componentsLevel).toEqual({ test: 0 });
      expect(sequence).toEqual({ test: 0 });
      expect(circularDependency).toEqual([]);
    });

    test('should set component dependencies level', () => {
      setDependenciesLevel(
        id,
        dependencies,
        componentsLevel,
        sequence,
        circularDependency
      );

      expect(componentsLevel).toEqual({
        test: 0,
        app: 1,
        otherApp: 2,
      });
      expect(sequence).toEqual({ test: 0 });
      expect(circularDependency).toEqual([]);
    });

    test("should add sequence to circular dependency array when there's a circular dependency", () => {
      componentsLevel = { app: 0 };
      sequence = {
        app: 0,
        test: 1,
      };

      setDependenciesLevel(
        id,
        dependencies,
        componentsLevel,
        sequence,
        circularDependency
      );

      expect(componentsLevel).toEqual({ app: 0 });
      expect(sequence).toEqual({ app: 0, test: 1 });
      expect(circularDependency).toEqual(['app', 'test', 'app']);
    });

    test('should update component dependencies level when dependency is in the same level than the component', () => {
      componentsLevel = {
        otherApp: 0, // Same level than "app" and "app" depends on it
        anotherApp: 1, // Will be moved to a level below when "otherApp" is moved
        app: 0,
      };
      sequence = {
        app: 0,
      };

      const dependenciesAux = {
        ...dependencies,
        otherApp: ['anotherApp'],
      };

      setDependenciesLevel(
        'app',
        dependenciesAux,
        componentsLevel,
        sequence,
        circularDependency
      );

      expect(componentsLevel).toEqual({
        otherApp: 1,
        anotherApp: 2,
        app: 0,
      });
      expect(sequence).toEqual({ app: 0 });
      expect(circularDependency).toEqual([]);
    });
  });

  describe('getDependencyGraphLevels', () => {
    test('should return a levels dictionary', () => {
      expect(getDependencyGraphLevels(dependencies)).toEqual({
        0: ['test'],
        1: ['app'],
        2: ['otherApp'],
      });
    });

    test('should return an object including the circular dependency array', () => {
      const dependenciesAux = {
        app: ['otherApp'],
        test: ['app'],
        otherApp: ['test'],
      };

      expect(getDependencyGraphLevels(dependenciesAux)).toEqual({
        circularDependency: ['app', 'otherApp', 'test', 'app'],
      });
    });
  });
});
