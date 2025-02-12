import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../routes/AppRouter';

describe('AppRouter Component', () => {
  const renderAppRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
  };
  it('renders Navigate component on / route', async () => {
    await act(async () => {
      await renderAppRouter();
    });
    await waitFor(() => {
      expect(screen.getByText('search')).toBeInTheDocument();
    });
  });
});
