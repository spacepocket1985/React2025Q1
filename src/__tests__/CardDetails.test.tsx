import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
      isLoading: false,
    },
    characters: {
      characters: mockCharacters,
      selectedCharacters: [],
    },
  };

  const store = createTestStore(initialState);
  it('check that the detailed card data is displayed when loading is false', async () => {
    render(
      <Provider store={store}>
        <CardDetails character={mockCharacters[1]} />
      </Provider>
    );
    const characterName = await screen.findByText(mockCharacters[1].name);
    const characterStatus = await screen.getByText(
      `Status - ${mockCharacters[1].status}`
    );

    expect(characterName).toBeInTheDocument();
    expect(characterStatus).toBeInTheDocument();
  });
  it('check that an appropriate message is displayed if no character', async () => {
    render(
      <Provider store={store}>
        <CardDetails character={null} />
      </Provider>
    );

    expect(
      screen.getByText('Unfortunately, nothing was found for your request.')
    ).toBeInTheDocument();
  });
});
