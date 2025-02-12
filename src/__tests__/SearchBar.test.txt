import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter as Router } from 'react-router-dom';
import { SearchBar } from '../components/searchBar/SearchBar';

const storageKey = 'futuramaSearchTem';

describe('tests for the SearchBar component', () => {
  const onSetQuery = vi.fn();
  const renderSearchBar = () => {
    return render(
      <Router>
        <SearchBar onSetQuery={onSetQuery} />
      </Router>
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
