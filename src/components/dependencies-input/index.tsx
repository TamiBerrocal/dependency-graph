import { useState } from 'react';
import './styles.css';
import { FormProps } from './types';
import {
  TEXTAREA_LABEL,
  SHOW_BUTTON_LABEL,
  CLEAR_BUTTON_LABEL,
} from './strings';
import { DATA_TESTID } from '../../data-testid';

export const DependenciesInput = ({
  showClearButton,
  onShowClick,
  onClearClick,
}: FormProps) => {
  const [value, setValue] = useState('');

  return (
    <form
      className="Form"
      data-testid={DATA_TESTID.DEPENDENCIES_INPUT}
      onSubmit={(event) => {
        // Send the textarea value back to the parent
        onShowClick(value);
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
          setValue(event.target.value);
        }}
      />
      {/* "Show" button will trigger the onSubmit callback of the form */}
      <button className="Button" type="submit">
        {SHOW_BUTTON_LABEL}
      </button>
      {/* Show the "Clear" button only when the graph is displayed on screen */}
      {showClearButton && (
        <button className="Button" type="button" onClick={onClearClick}>
          {CLEAR_BUTTON_LABEL}
        </button>
      )}
    </form>
  );
};
