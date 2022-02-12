export type GraphProps = {
  dependencies: string;
};

export type Error = {
  line: number;
  message: string;
};

export type ValidationResult = {
  dependencies: StringArrayDictionary;
  error?: Error;
};

export type StringArrayDictionary = Record<string, Array<string>>;
export type NumberDictionary = Record<string, number>;
