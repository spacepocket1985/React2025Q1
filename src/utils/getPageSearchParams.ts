export const storageKey = 'futuramaSearchTem';

const UrlParams = new URLSearchParams(window.location.search);

export const pageSearchParam = Number(UrlParams.get('page')) || 1;
export const querySearchParam =
  UrlParams.get('query') || localStorage.getItem(storageKey);
