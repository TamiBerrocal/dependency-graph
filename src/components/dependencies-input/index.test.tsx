import { render, screen } from '@testing-library/react';
import { DependenciesInput } from '.';
import { BUTTON_LABEL } from './strings';

describe('DependenciesInput', () => {
  const onClick = jest.fn();
  const props = { onClick };

  test('should render a textarea and a button', () => {
    render(<DependenciesInput {...props} />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: BUTTON_LABEL });

    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
