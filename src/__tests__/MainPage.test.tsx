import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';

import { mockResponse } from './mock/mockedData';
import Main from '../pages/Main';

describe('tests for the MainPage component', async () => {
  // vi.mock('../service/futuramaAPI', () => ({
  //   FuturamaApi: () => ({
  //     getCharacters: vi.fn(() => Promise.resolve(mockResponse)),
  //     loading: false,
  //     error: '',
  //   }),
  // }));

  // vi.mock('../service/futuramaAPI', async (importOriginal) => {
  //   const mod = await importOriginal<typeof import('../service/futuramaAPI')>();
  //   return {
  //     ...mod,
  //     DefaultSize: 10,
  //     DefaultPage: 1,
  //     DefaultQuery: '',
  //     FuturamaApi: () => ({
  //       getCharacters: vi.fn(() => Promise.resolve(mockResponse)),
  //       getCharacter: vi.fn(() => Promise.resolve(mockResponse.items[0])),
  //       loading: false,
  //       error: '',
  //       clearError: vi.fn(),
  //     }),
  //   };
  // });

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useSearchParams: vi.fn(() => {
        const setSearchParamsMock = vi.fn(); // Моковая функция для setSearchParams
        return [new URLSearchParams(), setSearchParamsMock]; // Возвращаем массив
      }),
    };
  });

  const mockResponse1 = {
    ok: true,
    statusText: 'OK',
    json: async () => mockResponse,
  } as Response;
  globalThis.fetch = vi.fn().mockResolvedValue(mockResponse1);
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

    act(async () => {
      await fireEvent.click(page3Button);
    });

    const setSearchParamsMock =
      vi.mocked(useSearchParams).mock.results[0].value[1];

    // Проверяем, что setSearchParams был вызван с правильными аргументами
    await waitFor(() => {
      expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '3' });
    });
  });
});
