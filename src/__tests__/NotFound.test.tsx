import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from 'vitest';
import { NotFound } from '../pages/NotFound';

describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <NotFound />
      </MemoryRouter>
    );

    const messageElement = screen.getByText('Page not found');
    expect(messageElement).toBeInTheDocument();
  });
});
