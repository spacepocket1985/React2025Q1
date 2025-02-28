import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

import { mockCharacters } from './mock/mockedData';
import { Card } from '../components/cards/card/Card';

import { Provider } from 'react-redux';
import { AppRootState } from '@store/store';
import { createTestStore } from './utls/createTestStore';

describe('tests for the Card List component', () => {
  const initialState: Partial<AppRootState> = {
    characters: {
      characters: mockCharacters,
      selectedCharacters: [],
    },
  };

  const store = createTestStore(initialState);

  const index = 1;
  const onCardClick = vi.fn();
  const renderCard = () => {
    return render(
      <Router>
        <Provider store={store}>
          <Card
            item={mockCharacters[0]}
            onCardClick={onCardClick}
            index={index}
          />
        </Provider>
      </Router>
    );
  };

  it('ensure that the card component renders the relevant card data', async () => {
    renderCard();
    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    const btnFavorite = await screen.findByTestId('btnFavorite');
    expect(btnFavorite).toBeInTheDocument();
  });

  it('validate that clicking on a card opens a detailed card component', async () => {
    renderCard();
    const card = await screen.findByTestId('card');
    fireEvent.click(card);

    expect(onCardClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).toHaveBeenCalledWith(index);
  });
  it('favorite click', async () => {
    renderCard();

    const btnFavorite = await screen.findByTestId('btnFavorite');
    expect(btnFavorite).toBeInTheDocument();

    await act(() => {
      btnFavorite.click();
    });
    expect(store.getState().characters.selectedCharacters.length).toBe(1);
  });
});
