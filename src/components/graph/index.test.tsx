import { render, screen } from '@testing-library/react';
import { Graph } from '.';
import { DATA_TESTID } from '../../data-testid';
import {
  validateInput,
  getDependencyGraphLevels,
} from '../../components/graph/helpers';
import { ERROR_MESSAGES } from '../../components/graph/strings';

jest.mock('../../components/graph/helpers', () => ({
  ...jest.requireActual('../../components/graph/helpers'),
  validateInput: jest.fn(
    jest.requireActual('../../components/graph/helpers').validateInput
  ),
  getDependencyGraphLevels: jest.fn(
    jest.requireActual('../../components/graph/helpers')
      .getDependencyGraphLevels
  ),
}));

describe('Graph', () => {
  const dependencies = '';
  const props = {
    dependencies,
  };

  test('should render a graph', () => {
    (validateInput as jest.Mock<any>).mockReturnValue({});
    (getDependencyGraphLevels as jest.Mock<any>).mockReturnValue({});

    render(<Graph {...props} />);
    const graph = screen.getByTestId(DATA_TESTID.GRAPH);
    expect(graph).toBeInTheDocument();
  });

  test('should render an error banner when there was a validation error', () => {
    (validateInput as jest.Mock<any>).mockReturnValue({
      error: { line: 1, message: 'Error' },
    });

    render(<Graph {...props} />);

    const errorBanner = screen.getByTestId(DATA_TESTID.ERROR_BANNER);
    const errorMessage = screen.getByText(
      ERROR_MESSAGES.VALIDATION_ERROR(1, 'Error')
    );

    expect(errorBanner).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  test('should render an error banner when there was a circular dependency', () => {
    (validateInput as jest.Mock<any>).mockReturnValue({});
    (getDependencyGraphLevels as jest.Mock<any>).mockReturnValue({
      circularDependency: ['A', 'B'],
    });

    render(<Graph {...props} />);

    const errorBanner = screen.getByTestId(DATA_TESTID.ERROR_BANNER);
    const errorMessage = screen.getByText(
      ERROR_MESSAGES.CIRCULAR_DEPENDENCY(['A', 'B'])
    );

    expect(errorBanner).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
