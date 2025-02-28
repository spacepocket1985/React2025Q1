import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { AppRootState } from '@store/store';
import { mockCharacters } from './mock/mockedData';
import { CardInformer } from '@components/cards/cardsInformer/CardsInformer';
import { Provider } from 'react-redux';

import { createTestStore } from './utls/createTestStore';

describe('tests for the CardInformer component', () => {
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
      selectedCharacters: [mockCharacters[0]],
    },
  };

  const store = createTestStore(initialState);
  it('Checks that the component is rendered when there are cards selected', async () => {
    render(
      <Provider store={store}>
        <CardInformer />
      </Provider>
    );
    const textInformer = await screen.getByText(
      `Selected - ${initialState.characters?.selectedCharacters.length} cards`
    );
    const downloadBtn = await screen.getByText('Download');
    const unselectBtn = await screen.getByText('Unselect all');
    expect(textInformer).toBeInTheDocument();
    expect(downloadBtn).toBeInTheDocument();
    expect(unselectBtn).toBeInTheDocument();
  });

  it('should trigger download when Download button is clicked', async () => {
    window.URL.createObjectURL = vitest.fn();
    window.URL.revokeObjectURL = vitest.fn();
    HTMLAnchorElement.prototype.click = vitest.fn();

    render(
      <Provider store={store}>
        <CardInformer />
      </Provider>
    );

    const downloadButton = await screen.findByText('Download');
    await fireEvent.click(downloadButton);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
