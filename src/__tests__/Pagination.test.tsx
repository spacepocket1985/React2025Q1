import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pagination } from '../components/pagination/Pagination';

import { AppRootState } from '@store/store';
import { Provider } from 'react-redux';
import { mockCharacters } from './mock/mockedData';
import { createTestStore } from './utls/createTestStore';

describe('tests for the Pagination component', () => {
  const initialState: Partial<AppRootState> = {
    appData: {
      total: 0,
      query: '',
      page: 2,
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

  const renderPagination = () => {
    return render(
      <Router>
        <Provider store={store}>
          <Pagination currentPage={2} totalPages={43} />
        </Provider>
      </Router>
    );
  };

  it('renders pagination buttons correctly', async () => {
    renderPagination();

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
  });

  it('checks the page value when clicking the next button', async () => {
    await renderPagination();

    const nextButton = screen.getByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    const { appData } = store.getState();
    expect(appData.page).toBe(initialState.appData!.page + 1);
  });

  it('displays the correct page numbers and ellipsis', async () => {
    await act(async () => {
      await renderPagination();
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
  });
});
