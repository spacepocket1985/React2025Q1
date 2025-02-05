import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

import { mockResponse } from './mock/mockedData';
import Main from '../pages/Main';

describe('tests for the MainPage component', async () => {
  vi.mock('../../service/futuramaAPI', () => ({
    FuturamaApi: {
      getCharacters: vi.fn(() => Promise.resolve(mockResponse)),
      loading: false,
      error: '',
    },
  }));
  const renderMain = () => {
    return render(
      <Router>
        <Main />
      </Router>
    );
  };
  it('Check that component updates URL query parameter when page changes', async () => {
    await act(async () => await renderMain());
    const page3Button = screen.getByText('3');
    await act(async () => {
      page3Button.click();
    });

    await act(() => {
      expect(window.location.search).toBe(
        '?filter=RingoStar&pageNumber=3&details='
      );
    });
  });
});
