import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockCharacters, mockResponse } from './mock/mockedData';
import { AppRootState } from '@store/store';
import { createTestStore } from './utls/createTestStore';
import { Provider } from 'react-redux';
import Main from '@pages/index';

vi.mock('next/router', () => vi.importActual('next-router-mock'));
describe('tests for the MainPage component', async () => {
  const initialState: Partial<AppRootState> = {
    appData: {
      total: 0,
      query: '',
      page: 1,
      pages: 43,
      cardDetails: '',
      isLoading: false,
    },
    characters: {
      characters: mockCharacters,
      selectedCharacters: [],
    },
  };

  const store = createTestStore(initialState);

  it('should render MainPage with correct card data and pagination elements', async () => {
    render(
      <Provider store={store}>
        <Main
          response={{
            data: {
              items: mockCharacters,
              total: 0,
              page: 2,
              size: 10,
              pages: 43,
            },
            error: {
              status: 0,
              data: undefined,
            },
          }}
          responseWithDetails={{
            data: {
              id: 1,
              name: 'Fry',
              gender: 'MALE',
              status: 'UNKNOWN',
              species: '',
              createdAt: '',
              image: '',
              isSelected: false,
            },
          }}
        />
      </Provider>
    );

    expect(
      (await screen.findAllByTestId('card')).length ===
        mockResponse.items.length
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText(mockResponse.items[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockResponse.items[5].name)).toBeInTheDocument();

    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
  });

  it('should display an error message when there is an error', async () => {
    const errorState = {
      ...initialState,
      appData: { ...initialState.appData, isLoading: false },
    };

    render(
      <Provider store={createTestStore(errorState)}>
        <Main
          response={{
            data: {
              items: [],
              total: 0,
              page: 1,
              size: 10,
              pages: 0,
            },
            error: {
              status: 404,
              data: 'Not Found',
            },
          }}
          responseWithDetails={null}
        />
      </Provider>
    );

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
  it('should close card details when clicking outside', async () => {
    const detailedCharacterState = {
      ...initialState,
      appData: { ...initialState.appData, cardDetails: '1', isLoading: false },
    };

    render(
      <Provider store={createTestStore(detailedCharacterState)}>
        <Main
          response={{
            data: {
              items: mockCharacters,
              total: 0,
              page: 2,
              size: 10,
              pages: 43,
            },
            error: null,
          }}
          responseWithDetails={{
            data: {
              id: 1,
              name: 'Fry',
              gender: 'MALE',
              status: 'UNKNOWN',
              species: '',
              createdAt: '',
              image: '',
              isSelected: false,
            },
          }}
        />
      </Provider>
    );

    expect(screen.getByText('Fry')).toBeInTheDocument();

    await waitFor(() => {
      screen.getByRole('main').click();
    });

    expect(screen.queryByText('Fry')).not.toBeInTheDocument();
  });
});
