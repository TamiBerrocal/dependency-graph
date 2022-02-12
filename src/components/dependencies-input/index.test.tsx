import { render, screen, fireEvent } from '@testing-library/react';
import { DependenciesInput } from '.';
import { DATA_TESTID } from '../../data-testid';
import { BUTTON_LABEL } from './strings';

describe('DependenciesInput', () => {
  const onSubmit = jest.fn();
  const onInputChange = jest.fn();
  const props = { onSubmit, onInputChange };

  test('should render a textarea and a button', () => {
    render(<DependenciesInput {...props} />);

    const label = screen.getByTestId(DATA_TESTID.LABEL);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: BUTTON_LABEL });

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should call onSubmit function when the button is clicked', () => {
    render(<DependenciesInput {...props} />);

    const button = screen.getByRole('button', { name: BUTTON_LABEL });
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });

  test('should call onInputChange function when the textarea input is changed', () => {
    render(<DependenciesInput {...props} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test' } });

    expect((textarea as HTMLTextAreaElement).value).toBe('test');
    expect(onInputChange).toHaveBeenCalled();
  });
});
