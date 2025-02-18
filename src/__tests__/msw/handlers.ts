import { http, HttpResponse } from 'msw';
import { mockCharacters } from '../mock/mockedData';

export const handlers = [
  http.get('https://futuramaapi.com/api/characters/2', () =>
    HttpResponse.json(mockCharacters[1])
  ),
  http.get('https://futuramaapi.com/api/characters', () =>
    HttpResponse.json({
      items: mockCharacters,
      total: 55,
      page: 2,
      size: 15,
      pages: 43,
    })
  ),
];
