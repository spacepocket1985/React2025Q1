import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BaseUrl,
  DefaultOrder,
  DefaultPage,
  DefaultQuery,
  DefaultSize,
  Page,
  Query,
  Size,
  transformCharacter,
} from '@service/futuramaAPI';
import { ApiResponse, Character } from '../../types';

export const apiFuturama = createApi({
  reducerPath: 'apiFuturama',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      ApiResponse,
      { filterWord: string; pageNum: number }
    >({
      query: ({ filterWord = DefaultQuery, pageNum = DefaultPage }) => {
        const queryString =
          DefaultOrder +
          Query +
          filterWord +
          Page +
          pageNum +
          Size +
          DefaultSize;

        return {
          url: queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: ApiResponse) => ({
        ...response,
        items: response.items.map((item) => transformCharacter(item)),
      }),
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => ({ url: `/${id}`, method: 'GET' }),
      transformResponse: (response: Character) => transformCharacter(response),
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterQuery } = apiFuturama;
