import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { AppRootState } from '@store/store';
import { CardList } from '@components/cards/cardsList/CardList';
import { createTestStore } from './utls/createTestStore';
import { mockCharacters } from './mock/mockedData';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
}));

describe('CardList', () => {
  it('verify that the component renders the specified number of cards', async () => {
    const initialState: Partial<AppRootState> = {
      characters: {
        characters: mockCharacters,
        selectedCharacters: [],
      },
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <CardList items={mockCharacters} />
      </Provider>
    );

    const cards = await screen.findAllByTestId('card');
    const cardSpanElements = await screen.getAllByRole('img');

    expect(cards.length).toBe(mockCharacters.length);
    expect(cardSpanElements).toHaveLength(mockCharacters.length);
    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
  });

  it('check that an appropriate message is displayed if no cards are present', () => {
    const initialState: Partial<AppRootState> = {
      characters: {
        characters: [],
        selectedCharacters: [],
      },
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <CardList items={[]} />
      </Provider>
    );

    expect(
      screen.getByText('Unfortunately, nothing was found for your request.')
    ).toBeInTheDocument();
  });
});
