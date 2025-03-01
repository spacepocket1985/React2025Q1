import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SearchBar } from '../components/searchBar/SearchBar';
import { storeInstance } from '@store/store';
import { Provider } from 'react-redux';

const storageKey = 'futuramaSearchTem';

describe('tests for the SearchBar component', () => {
  const renderSearchBar = () => {
    return render(
      <Provider store={storeInstance}>
        <SearchBar />
      </Provider>
    );
  };
  it('clicking the search button saves the entered value to the local storage', async () => {
    renderSearchBar();

    fireEvent.change(screen.getByTestId('searchInput'), {
      target: { value: 'AlexFry' },
    });
    fireEvent.click(screen.getByTestId('serachSubmit'));
    expect(localStorage.getItem(storageKey)).toBe('AlexFry');
    fireEvent.change(screen.getByTestId('searchInput'), {
      target: { value: 'Bender' },
    });
    fireEvent.submit(screen.getByTestId('serachSubmit'));
    expect(localStorage.getItem(storageKey)).toBe('Bender');
  });
  it('The component retrieves the value from the local storage upon mounting.', async () => {
    renderSearchBar();

    const localStorageValue = localStorage.getItem(storageKey);

    expect(screen.getByTestId('searchInput')).toHaveValue(localStorageValue);
  });
});
