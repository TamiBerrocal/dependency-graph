import { render, screen } from '@testing-library/react';
import { Graph } from '.';

describe('Graph', () => {
  const dependencies = '';
  const props = {
    dependencies,
  };

  test('should render graph', () => {
    render(<Graph {...props} />);
    const graph = screen.getByText('Graph');
    expect(graph).toBeInTheDocument();
  });
});
