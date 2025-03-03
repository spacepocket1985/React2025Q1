import { http, HttpResponse } from 'msw';

import { mockCharacters } from '../mock/mockedData';

export const MOCK_QUERY = 'fry';
export const MOCK_PAGE = '1';

export const handlers = [
  http.get(`*/character`, ({ request }) => {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');
    const name = searchParams.get('query');

    if (page === MOCK_PAGE && name === MOCK_QUERY) {
      return HttpResponse.json({
        items: mockCharacters,
        total: 55,
        page: 2,
        size: 15,
        pages: 43,
      });
    }

    if (name === 'status 500') {
      return new HttpResponse(null, { status: 500 });
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.get(`*/character/:characterId`, ({ params }) => {
    const { characterId } = params;

    if (characterId === mockCharacters[1].id.toString()) {
      return HttpResponse.json(mockCharacters[1]);
    }
  }),
];
