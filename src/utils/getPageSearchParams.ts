import { DefaultPage } from '../service/futuramaAPI';

export const storageKey = 'futuramaSearchTem';

const UrlParams = new URLSearchParams(window.location.search);

export const pageSearchParam = Number(UrlParams.get('page')) || DefaultPage;
export const querySearchParam =
  UrlParams.get('query') || localStorage.getItem(storageKey);
export const detailsSearchParam = UrlParams.get('details');
