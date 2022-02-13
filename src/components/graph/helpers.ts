import { DEPENDS, NEW_LINE, WHITESPACE } from './constants';
import { ERROR_MESSAGES } from './strings';
import {
  StringArrayDictionary,
  NumberDictionary,
  ValidationResult,
} from './types';

/**
 * This function will return the level for a given component
 * @param id              Id of the component
 * @param componentsLevel Components level dictionary
 * @returns
 */
export const getDependencyLevel = (
  id: string,
  componentsLevel: NumberDictionary
) => {
  return componentsLevel[id] || -1;
};

/**
 * This function will set the level for each of the dependencies of a component and for its dependencies' dependencies as well
 * @param id                  Id of the component
 * @param level               Level of the component
 * @param dependencies        Dependencies dictionary
 * @param componentsLevel     Components level dictionary
 * @param sequence            Dependency sequence
 * @param circularDependency  Circular dependency array
 * @returns
 */
export const setDependenciesLevel = (
  id: string,
  level: number,
  dependencies: StringArrayDictionary,
  componentsLevel: NumberDictionary,
  sequence: NumberDictionary,
  circularDependency: Array<string>
) => {
  // If the provided component doesn't have dependencies, return
  if (!dependencies[id]) {
    return;
  }

  // Loop the component dependencies
  for (let i = 0; i < dependencies[id].length; i++) {
    const dependencySequence = { ...sequence };
    const depId = dependencies[id][i];

    // If the current dependency is already part of the dependency sequence, there's a circular dependency
    if (dependencySequence[depId]) {
      Object.keys(dependencySequence).forEach((id) => {
        circularDependency[dependencySequence[id]] = id;
      });

      if (circularDependency[0]) {
        circularDependency.push(depId);
      }

      break;
    }

    // If the current dependency is not part of the dependency sequence, add it
    dependencySequence[depId] = Object.keys(dependencySequence).length;
    let depLevel = getDependencyLevel(depId, componentsLevel);

    // If the dependency is not included in the dictionary, include it and do the same for its dependencies recursively
    if (depLevel === -1) {
      depLevel = level + 1;
      componentsLevel[depId] = depLevel;
      setDependenciesLevel(
        depId,
        depLevel,
        dependencies,
        componentsLevel,
        dependencySequence,
        circularDependency
      );
    } else {
      // If the dependency is included in the dictionary but its level is not below the level of the component, change it to
      // a level below the component's one (level + 1)
      if (depLevel <= level) {
        depLevel = level + 1;
        componentsLevel[depId] = depLevel;
        setDependenciesLevel(
          depId,
          depLevel,
          dependencies,
          componentsLevel,
          dependencySequence,
          circularDependency
        );
      }
    }

    // If the circular dependency array is not empty, break out of the loop
    if (circularDependency.length > 0) break;
  }
};

/**
 * This function will return a dictionary with the components belonging to each level of the graph
 * @param dependencies  Dependencies dictionary
 * @returns
 */
export const getDependencyGraphLevels = (
  dependencies: StringArrayDictionary
) => {
  // Array to be filled with components that are part of a circular dependency
  const circularDependency: Array<string> = [];

  // Dictionary with the level in which each component should be placed in the graph
  const componentsLevel: NumberDictionary = {};

  // Dictionary with the components on each level
  const levels: StringArrayDictionary = {};

  // Loop the components in the dependencies dictionary
  for (let i = 0; i < Object.keys(dependencies).length; i++) {
    const id = Object.keys(dependencies)[i];
    const sequence = { [id]: 0 };

    let level = getDependencyLevel(id, componentsLevel);

    // If the component is not included in the dictionary, include it and do the same for its dependencies recursively
    if (level === -1) {
      level = 0;
      componentsLevel[id] = level;
      setDependenciesLevel(
        id,
        level,
        dependencies,
        componentsLevel,
        sequence,
        circularDependency
      );

      // If the circular dependency array is not empty, return an object including it
      if (circularDependency.length > 0) {
        if (!circularDependency[0]) {
          circularDependency[0] = id;
          return { circularDependency };
        }

        return { circularDependency };
      }
    }
  }

  // Loop the components level dictionary to populate the levels dictionary
  Object.keys(componentsLevel).forEach((component) => {
    const level = componentsLevel[component];

    if (!levels[level]) {
      levels[level] = [];
    }

    levels[level].push(component);
  });

  return levels;
};

/**
 * This function will validate the raw input and return a dependencies dictionary or an error object
 * @param input Raw input
 * @returns
 */
export const validateInput = (input: string): ValidationResult => {
  // Validation RegEx (additional whitespaces between the elements will be accepted)
  const validLine = /^([a-z]+) +DEPENDS +((?:[a-z]+ *)+)$/i;

  // Dependencies dictionary
  const dependencies: StringArrayDictionary = {};
  let error;

  // Loop input lines
  input.split(NEW_LINE).forEach((line, i) => {
    const result = validLine.exec(line);

    // If the line is not valid, return error
    if (!result) {
      error = { line: i + 1, message: ERROR_MESSAGES.INVALID_RULE_FORMAT };
      return;
    }

    const component = result[1].toUpperCase();
    const componentDependenciesString = result[2].toUpperCase();

    // Remove empty strings and duplicates
    const componentDependencies = [
      ...new Set(
        componentDependenciesString
          .split(WHITESPACE)
          .filter((dependency) => dependency !== '')
      ),
    ];

    // If one of the component dependencies is "depends", return error
    if (componentDependencies.includes(DEPENDS)) {
      error = { line: i + 1, message: ERROR_MESSAGES.RESERVED_WORD };
      return;
    }

    // If one of the component dependencies is the component itself, return error
    if (componentDependencies.includes(component)) {
      error = {
        line: i + 1,
        message: ERROR_MESSAGES.CIRCULAR_DEPENDENCY([component, component]),
      };
      return;
    }

    // If the line is valid, set component dependencies in the dictionary
    dependencies[component] = componentDependencies;
  });

  return { dependencies, error };
};
