import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter as Router } from 'react-router-dom';
import { CardDetails } from '../components/cards/cardDetails/CardDetails';
import { mockCharacters } from './mock/mockedData';
import { AppRootState } from '@store/store';
import { Provider } from 'react-redux';
import { createTestStore } from './utls/createTestStore';

describe('tests for the Detailed Card component', () => {
  const initialState: Partial<AppRootState> = {
    appData: {
      total: 0,
      query: '',
      page: 2,
      pages: 43,
      cardDetails: '2',
    },
    characters: {
      characters: mockCharacters,
      selectedCharacters: [],
    },
  };

  const store = createTestStore(initialState);
  it('check that the detailed card data is displayed when loading is false', async () => {
    render(
      <Router>
        <Provider store={store}>
          <CardDetails />
        </Provider>
      </Router>
    );
    const characterName = await screen.findByText(mockCharacters[1].name);
    expect(characterName).toBeInTheDocument();
  });
});
