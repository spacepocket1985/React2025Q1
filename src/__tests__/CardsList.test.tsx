import { render, screen, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { CardList } from '../components/cards/cardsList/CardList';
import { mockCharacters } from './mock/mockedData';
import { Character } from '../types';

describe('tests for the Card List component', () => {
  const renderCardList = (characters: Character[]) => {
    return render(
      <Router>
        <CardList items={characters} onCardClick={function (): void {}} />
      </Router>
    );
  };
  it('verify that the component renders the specified number of cards', async () => {
    await act(async () => {
      renderCardList(mockCharacters);
    });
    const cards = await screen.findAllByTestId('card');
    const cardSpanElements = await screen.getAllByRole('img');

    expect(cards.length).toBe(mockCharacters.length);
    expect(cardSpanElements).toHaveLength(mockCharacters.length);
  });
  it('check that an appropriate message is displayed if no cards are present.', async () => {
    await act(async () => {
      renderCardList([]);
    });
    expect(
      screen.getByText('Unfortunately, nothing was found for your request.')
    ).toBeInTheDocument();
  });
});
