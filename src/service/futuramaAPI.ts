import { useHttp } from '../hooks/useHttp';
import { ApiResponse, Character } from '../types';

const BaseUrl = 'https://futuramaapi.com/api/characters';
const Size = '&size=';
const Page = '&page=';
const Query = '&query=';

export const DefaultSize = '12';
export const DefaultPage = '1';
export const DefaultQuery = '';
const DefaultOrder = '?orderBy=id&orderByDirection=asc';

export const FuturamaApi = () => {
  const { loading, request, error, clearError } = useHttp();

  const getCharacters = async (
    filterWord = DefaultQuery,
    sizeNum = DefaultSize,
    pageNum = DefaultPage
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
    return result;
  };
  const getCharacter = async (id: string): Promise<Character> => {
    const result = (await request(`${BaseUrl}/${id}`)) as Character;
    return result;
  };

  return {
    error,
    clearError,
    loading,
    getCharacters,
    getCharacter,
  };
};
