import { DefaultPage } from '../service/futuramaAPI';

export const storageKey = 'futuramaSearchTem';

let pageSearchParam = DefaultPage;
let querySearchParam = null;
let detailsSearchParam = null;

if (typeof window !== 'undefined') {
  const UrlParams = new URLSearchParams(window.location.search);
  pageSearchParam = Number(UrlParams.get('page')) || DefaultPage;

  querySearchParam = UrlParams.get('query') || localStorage.getItem(storageKey);
  detailsSearchParam = UrlParams.get('details');
}

export { pageSearchParam, querySearchParam, detailsSearchParam };
