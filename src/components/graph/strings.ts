const INVALID_RULE = 'Line must follow the input specification.';

export const ERROR_MESSAGES = {
  INVALID_RULE_FORMAT: `${INVALID_RULE} Valid component names are contiguous strings of letters, special characters are not admitted.`,
  RESERVED_WORD: `${INVALID_RULE}. "Depends" is a reserved word.`,
  CIRCULAR_DEPENDENCY: (sequence: Array<string>) =>
    `There's a circular dependency for components ${sequence.join('-')}.`,
  VALIDATION_ERROR: (line: number, message: string) =>
    `There was an error in line ${line}: ${message}`,
};
