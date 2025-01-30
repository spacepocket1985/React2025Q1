const storageKey = 'futuramaSearchTem';
export const getSearchTermFromLS = (): string =>
  localStorage.getItem(storageKey) || '';

export const setSearchTermToLS = (term: string): void =>
  localStorage.setItem(storageKey, term);
