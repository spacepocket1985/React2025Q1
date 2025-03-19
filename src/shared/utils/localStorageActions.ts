import { SortOrder } from '@features/countriesList/model/types';
import { SearchSliceType } from '@features/countrySearch/model/types';

export const searchStorageKey = 'savedSearchOptions';
export const sortStorageKey = 'savedSortOrder';

export const getQueriesFromLS = (): SearchSliceType => {
  const storedData = localStorage.getItem(searchStorageKey);
  return storedData ? JSON.parse(storedData) : null;
};

export const saveQueriesToLS = (options: SearchSliceType): void => {
  localStorage.setItem(searchStorageKey, JSON.stringify(options));
};

export const getSortOrderFromLS = (): SortOrder => {
  const storedData = localStorage.getItem(sortStorageKey);
  return storedData ? JSON.parse(storedData) : null;
};

export const saveSortOrderToLS = (options: SortOrder): void => {
  localStorage.setItem(sortStorageKey, JSON.stringify(options));
};
