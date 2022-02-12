import { DEPENDS, NEW_LINE, WHITESPACE } from './constants';
import {
  StringArrayDictionary,
  NumberDictionary,
  ValidationResult,
} from './types';

/**
 * This function will return the level for a given component
 * @param id              Id of the component
 * @param componentsLevel Levels dictionary
 * @returns
 */
const getDependencyLevel = (id: string, componentsLevel: NumberDictionary) => {
  return componentsLevel[id] || -1;
};

/**
 * This function will set the level for each of the dependencies of a component and for those dependencies' dependencies as well
 * @param id              Id of the component
 * @param level           Level of the component
 * @param dependencies    Dependencies dictionary
 * @param componentsLevel Components level dictionary
 * @param relations       Relations dictionary
 * @returns
 */
const setDependenciesLevel = (
  id: string,
  level: number,
  dependencies: StringArrayDictionary,
  componentsLevel: NumberDictionary
) => {
  // If the provided component doesn't have dependencies, return
  if (!dependencies[id]) {
    return;
  }

  // Loop the dependencies
  dependencies[id].forEach((depId) => {
    let depLevel = getDependencyLevel(depId, componentsLevel);

    // If the dependency is not included in the dictionary, include it and do the same for its dependencies recursively
    if (depLevel === -1) {
      depLevel = level + 1;
      componentsLevel[depId] = depLevel;
      setDependenciesLevel(depId, depLevel, dependencies, componentsLevel);
    } else {
      // If the dependency is included in the dictionary but its level (depLevel) is nearer to the root than the level of the
      // component that depends on it (level), replace the current level of the dependency (depLevel) with the level that
      // follows the component's level (level + 1) and do the same for its dependencies recursively
      if (depLevel <= level) {
        depLevel = level + 1;
        componentsLevel[depId] = depLevel;
        setDependenciesLevel(depId, depLevel, dependencies, componentsLevel);
      }
    }
  });
};

/**
 * This function will return a dictionary with the components belonging to each level of the graph
 * @param dependencies  Dependencies dictionary
 * @returns
 */
export const getDependencyGraphLevels = (
  dependencies: StringArrayDictionary
) => {
  // Dictionary with the level in which each component should be placed in the graph
  const componentsLevel: NumberDictionary = {};

  // Dictionary with the components on each level
  const levels: StringArrayDictionary = {};

  // Loop the components in the dependencies dictionary
  Object.keys(dependencies).forEach((id: string) => {
    let level = getDependencyLevel(id, componentsLevel);

    // If the component is not included in the dictionary, include it and do the same for its dependencies recursively
    if (level === -1) {
      level = 0;
      componentsLevel[id] = level;
      setDependenciesLevel(id, level, dependencies, componentsLevel);
    }
  });

  // Loop the components' level dictionary to populate the levels dictionary
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
  // Validation RegEx
  const validLine = /^([a-z]+) +DEPENDS +((?:[a-z]+ *)+)$/i;

  // Components dependencies dictionary
  const dependencies: StringArrayDictionary = {};
  let error;

  // Loop input lines
  input.split(NEW_LINE).forEach((line, i) => {
    const result = validLine.exec(line);

    // If the line is not valid, return error
    if (!result) {
      error = {
        line: i + 1,
        message:
          'Line must follow the input specification. Valid component names are contiguous strings of letters, special characters are not admitted.',
      };

      return;
    }

    // If the line is valid, set its dependencies in the dictionary
    const component = result[1].toUpperCase();
    const dependenciesString = result[2].toUpperCase();

    // Remove empty strings and duplicates
    const componentDependencies = [
      ...new Set(
        dependenciesString
          .split(WHITESPACE)
          .filter((dependency) => dependency !== '')
      ),
    ];

    // If the name of one of the component dependencies is "depends", return error
    if (componentDependencies.includes(DEPENDS)) {
      error = {
        line: i + 1,
        message:
          'Line must follow the input specification. "Depends" is a reserved word.',
      };

      return;
    }

    dependencies[component] = componentDependencies;
  });

  // TODO: Get circular dependencies

  return { dependencies, error };
};
