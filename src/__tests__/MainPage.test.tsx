import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

import { mockResponse } from './mock/mockedData';
import Main from '../pages/Main';

describe('tests for the MainPage component', async () => {
  const mockFetchResponse = {
    ok: true,
    statusText: 'OK',
    json: async () => mockResponse,
  } as Response;
  globalThis.fetch = vi.fn().mockResolvedValue(mockFetchResponse);
  const renderMain = () => {
    return render(
      <Router>
        <Main />
      </Router>
    );
  };
  it('should render MainPage with correct card data and pagination elements', async () => {
    await act(async () => await renderMain());

    expect(
      (await screen.findAllByTestId('card')).length ===
        mockResponse.items.length
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText(mockResponse.items[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockResponse.items[5].name)).toBeInTheDocument();

    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
  });
});
