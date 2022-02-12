import { render, screen, fireEvent } from '@testing-library/react';
import { DependenciesInput } from '.';
import { DATA_TESTID } from '../../data-testid';
import { SHOW_BUTTON_LABEL, CLEAR_BUTTON_LABEL } from './strings';

describe('DependenciesInput', () => {
  const showClearButton = false;
  const onShowClick = jest.fn();
  const onClearClick = jest.fn();
  const props = { showClearButton, onShowClick, onClearClick };

  test('should render a textarea and a "Show" button', () => {
    render(<DependenciesInput {...props} />);

    const label = screen.getByTestId(DATA_TESTID.LABEL);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: SHOW_BUTTON_LABEL });

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  describe('showClearButton', () => {
    test('should not render a "Clear" button', () => {
      render(<DependenciesInput {...props} />);
      const button = screen.getByRole('button', { name: CLEAR_BUTTON_LABEL });
      expect(button).not.toBeInTheDocument();
    });

    test('should render a "Clear" button', () => {
      render(<DependenciesInput {...props} showClearButton />);
      const button = screen.getByRole('button', { name: CLEAR_BUTTON_LABEL });
      expect(button).toBeInTheDocument();
    });
  });

  test('should call onShowClick function when the "Show" button is clicked', () => {
    render(<DependenciesInput {...props} />);

    const button = screen.getByRole('button', { name: SHOW_BUTTON_LABEL });
    fireEvent.click(button);

    expect(onShowClick).toHaveBeenCalled();
  });

  test('should call onClearClick function when the "Clear" button is clicked', () => {
    render(<DependenciesInput {...props} showClearButton />);

    const button = screen.getByRole('button', { name: CLEAR_BUTTON_LABEL });
    fireEvent.click(button);

    expect(onClearClick).toHaveBeenCalled();
  });
});
