import { render, screen } from '@testing-library/react';
import { Header } from '.';
import { TITLE } from './strings';

describe('Header', () => {
  test('should render app title and description', () => {
    render(<Header />);
    const header = screen.getByRole('heading', { name: TITLE });
    const description = screen.getByTestId('description');

    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
