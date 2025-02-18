import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from '../pages/Main';
import { mockCharacters, mockResponse } from './mock/mockedData';
import { AppRootState } from '@store/store';
import { createTestStore } from './utls/createTestStore';
import { Provider } from 'react-redux';

describe('tests for the MainPage component', async () => {
  const initialState: Partial<AppRootState> = {
    appData: {
      total: 0,
      query: '',
      page: 5,
      pages: 43,
      cardDetails: '',
    },
    characters: {
      characters: mockCharacters,
      selectedCharacters: [],
    },
  };

  const store = createTestStore(initialState);

  it('should render MainPage with correct card data and pagination elements', async () => {
    render(
      <Router>
        <Provider store={store}>
          <Main />
        </Provider>
      </Router>
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
});
