import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorBoundary from '../components/error/errorBoundary/ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('test for ErrorBoundary Component', () => {
  const children = 'children';
  const renderErrorBoundary = () => {
    return render(<ErrorBoundary>{children}</ErrorBoundary>);
  };

  it('should render children when there is no error', () => {
    renderErrorBoundary();
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should render error message when there is an error', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByText('ErrorBoundary is working')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });
});
