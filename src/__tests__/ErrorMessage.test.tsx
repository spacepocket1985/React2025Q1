import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from '../components/error/errorMessage/ErrorMessage';

describe('test for ErrorMessage component', () => {
  const errMsg = 'An error occurred while loading data';
  const renderErrorMessage = () => {
    return render(<ErrorMessage errorMsg={errMsg} />);
  };
  it('renders error message component with error message properly', () => {
    renderErrorMessage();
    expect(screen.getByText(errMsg)).toBeInTheDocument();
  });
});
