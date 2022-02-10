import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render app header and dependencies input', () => {
    render(<App />);
    const header = screen.getByTestId('header');
    const input = screen.getByTestId('dependencies-input');

    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
