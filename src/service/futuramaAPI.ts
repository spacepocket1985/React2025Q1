import { useCallback } from 'react';
import { useHttp } from '../hooks/useHttp';
import { ApiResponse, Character } from '../types';
import noImage from '../assets/noImage.png';

const BaseUrl = 'https://futuramaapi.com/api/characters';
const Size = '&size=';
const Page = '&page=';
const Query = '&query=';

export const DefaultSize = 10;
export const DefaultPage = 1;
export const DefaultQuery = '';
const DefaultOrder = '?orderBy=id&orderByDirection=asc';

export const FuturamaApi = () => {
  const { loading, request, error, clearError } = useHttp();

  const getCharacters = useCallback(
    async (
      filterWord = DefaultQuery,
      pageNum = DefaultPage,
      sizeNum = DefaultSize
    ): Promise<ApiResponse> => {
      const result = (await request(
        BaseUrl +
          DefaultOrder +
          Query +
          filterWord +
          Page +
          pageNum +
          Size +
          sizeNum
      )) as ApiResponse;
      return {
        ...result,
        items: result.items.map((item) => transformCharacter(item)),
      };
    },
    [request]
  );
  const getCharacter = useCallback(
    async (id: string): Promise<Character> => {
      const result = (await request(`${BaseUrl}/${id}`)) as Character;
      return transformCharacter(result);
    },
    [request]
  );

  const transformCharacter = (character: Character): Character => {
    const updatedCharacter = { ...character };

    if (character.image === null) {
      updatedCharacter.image = noImage;
    }
    return updatedCharacter;
  };

  return {
    error,
    clearError,
    loading,
    getCharacters,
    getCharacter,
  };
};
