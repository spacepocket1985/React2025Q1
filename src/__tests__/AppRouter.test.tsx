import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../routes/AppRouter';
import { store } from '@store/store';
import { Provider } from 'react-redux';

describe('AppRouter Component', () => {
  const renderAppRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MemoryRouter>
    );
  };
  it('renders Navigate component on / route', async () => {
    renderAppRouter();

    await waitFor(() => {
      expect(screen.getByText('search')).toBeInTheDocument();
    });
  });
});
