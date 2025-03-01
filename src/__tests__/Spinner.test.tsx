import { Spinner } from '@components/spinner/Spinner';
import { render, screen } from '@testing-library/react';

describe('test for Spinner', () => {
  it('renders the Loader component', async () => {
    render(<Spinner />);

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
