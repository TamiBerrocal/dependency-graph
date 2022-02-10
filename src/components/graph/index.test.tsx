import { render, screen } from '@testing-library/react';
import { Graph } from '.';

describe('Graph', () => {
  test('should render graph', () => {
    render(<Graph />);
    const graph = screen.getByText('Graph');
    expect(graph).toBeInTheDocument();
  });
});
