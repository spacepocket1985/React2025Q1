import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter as Router } from 'react-router-dom';
import ErrorBoundary from '../components/error/errorBoundary/ErrorBoundary';

describe('test for ErrorBoundary Component', () => {
  const children = 'children';
  const renderErrorBoundary = () => {
    return render(
      <Router>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Router>
    );
  };

  it('should render children when there is no error', () => {
    renderErrorBoundary();
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
