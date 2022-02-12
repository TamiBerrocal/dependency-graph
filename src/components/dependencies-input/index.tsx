import { useState } from 'react';
import './styles.css';
import { FormProps } from './types';
import { TEXTAREA_LABEL, BUTTON_LABEL } from './strings';
import { DATA_TESTID } from '../../data-testid';

export const DependenciesInput = ({ onSubmit, onInputChange }: FormProps) => {
  const [value, setValue] = useState('');

  return (
    <form
      className="Form"
      data-testid={DATA_TESTID.DEPENDENCIES_INPUT}
      onSubmit={(event) => {
        // Send the textarea value back to the parent
        onSubmit(value);
        event.preventDefault();
      }}
    >
      <label
        className="Label"
        data-testid={DATA_TESTID.LABEL}
        htmlFor="ta-dependencies"
      >
        {TEXTAREA_LABEL}
      </label>
      <textarea
        className="TextArea"
        id="ta-dependencies"
        name="ta-dependencies"
        required
        placeholder="Enter a series of dependencies"
        value={value}
        onChange={(event) => {
          onInputChange();
          setValue(event.target.value);
        }}
      />
      {/* The button will trigger the onSubmit callback of the form */}
      <button className="Button" type="submit">
        {BUTTON_LABEL}
      </button>
    </form>
  );
};
