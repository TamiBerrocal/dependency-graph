import { render, screen } from '@testing-library/react';
import { Header } from '.';
import { DATA_TESTID } from '../../data-testid';
import { TITLE } from './strings';

describe('Header', () => {
  test('should render app title and description', () => {
    render(<Header />);

    const logo = screen.getByRole('img');
    const header = screen.getByRole('heading', { name: TITLE });
    const description = screen.getByTestId(DATA_TESTID.DESCRIPTION);

    expect(logo).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
