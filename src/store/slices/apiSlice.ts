import {
  CombinedState,
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
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
import { RootState } from '@store/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const apiFuturama = createApi({
  reducerPath: 'apiFuturama',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, string, 'apiFuturama'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
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
        items: Array.isArray(response.items)
          ? response.items.map((item) => transformCharacter(item))
          : [],
      }),
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => ({ url: `/${id}`, method: 'GET' }),
      transformResponse: (response: Character) => transformCharacter(response),
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterQuery } = apiFuturama;
export const { getAllCharacters, getCharacter } = apiFuturama.endpoints;
