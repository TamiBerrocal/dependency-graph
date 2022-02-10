import './styles.css';
import { FormProps } from './types';
import { TEXTAREA_LABEL, BUTTON_LABEL } from './strings';

export const DependenciesInput = ({ onClick }: FormProps) => (
  <div className="DependenciesInput" data-testid="dependencies-input">
    <label className="Label" htmlFor="textarea-dependencies">
      {TEXTAREA_LABEL}
    </label>
    <textarea
      className="TextArea"
      id="textarea-dependencies"
      name="dependencies"
      placeholder="Enter a series of dependencies"
    />
    <button className="Button" type="button" onClick={onClick}>
      {BUTTON_LABEL}
    </button>
  </div>
);
