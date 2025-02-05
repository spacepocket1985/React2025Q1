import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

import { mockCharacters } from './mock/mockedData';

import { Card } from '../components/cards/card/Card';

describe('tests for the Card List component', () => {
  const index = 1;
  const onCardClick = vi.fn();
  const renderCard = () => {
    return render(
      <Router>
        <Card
          item={mockCharacters[0]}
          onCardClick={onCardClick}
          index={index}
        />
      </Router>
    );
  };

  it('ensure that the card component renders the relevant card data', async () => {
    await act(async () => {
      renderCard();
    });
    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
  });
  it('validate that clicking on a card opens a detailed card component', async () => {
    await act(async () => {
      renderCard();
    });
    const card = await screen.findByTestId('card');
    await act(async () => {
      await fireEvent.click(card);
    });

    expect(onCardClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).toHaveBeenCalledWith(index);
  });
});
