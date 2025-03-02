export const storageKey = 'futuramaSearchTem';

let pageSearchParam = 1;
let querySearchParam = '';
let detailsSearchParam = '';

if (typeof window !== 'undefined') {
  const UrlParams = new URLSearchParams(window.location.search);
  pageSearchParam = Number(UrlParams.get('page')) || 1;

  querySearchParam =
    UrlParams.get('query') || localStorage.getItem(storageKey) || '';
  detailsSearchParam = UrlParams.get('cardDetails') || '';
}

export { pageSearchParam, querySearchParam, detailsSearchParam };
