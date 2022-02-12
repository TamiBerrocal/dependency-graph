import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { DATA_TESTID } from './data-testid';
import {
  validateInput,
  getDependencyGraphLevels,
} from './components/graph/helpers';
import { ERROR_MESSAGES } from './components/graph/strings';

jest.mock('./components/graph/helpers', () => ({
  ...jest.requireActual('./components/graph/helpers'),
  validateInput: jest.fn(
    jest.requireActual('./components/graph/helpers').validateInput
  ),
  getDependencyGraphLevels: jest.fn(
    jest.requireActual('./components/graph/helpers').getDependencyGraphLevels
  ),
}));

describe('App', () => {
  test('should render the header and the dependencies input', () => {
    render(<App />);
    const header = screen.getByTestId('header');
    const input = screen.getByTestId('dependencies-input');

    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('should render the graph', () => {
    (validateInput as jest.Mock<any>).mockReturnValue({});
    (getDependencyGraphLevels as jest.Mock<any>).mockReturnValue({});

    render(<App />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    const graph = screen.getByTestId(DATA_TESTID.GRAPH);

    expect(graph).toBeInTheDocument();
  });

  test('should render an error banner', () => {
    (validateInput as jest.Mock<any>).mockReturnValue({
      error: { line: 1, message: 'Error' },
    });

    render(<App />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    const errorBanner = screen.getByTestId(DATA_TESTID.ERROR_BANNER);
    const errorMessage = screen.getByText(
      ERROR_MESSAGES.VALIDATION_ERROR(1, 'Error')
    );

    expect(errorBanner).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
