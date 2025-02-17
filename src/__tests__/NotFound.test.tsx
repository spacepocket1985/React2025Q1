import { NotFound } from '@pages/NotFound';
import { store } from '@store/store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from 'vitest';

describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Provider store={store}>
          <NotFound />
        </Provider>
      </MemoryRouter>
    );

    const messageElement = screen.getByText('Page not found');
    expect(messageElement).toBeInTheDocument();
  });
});
