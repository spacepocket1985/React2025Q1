import { querySearchParam } from '@utils/getPageSearchParams';
import { ApiResponse, Character } from '../types';
import noImage from '@assets/noImage.png';

export const BaseUrl = 'https://futuramaapi.com/api/characters';
export const Size = '&size=';
export const Page = '&page=';
export const Query = '&query=';

export const DefaultSize = 10;
export const DefaultPage = 1;
export const DefaultQuery = '';
export const DefaultOrder = '?orderBy=id&orderByDirection=asc';

export const transformCharacter = (character: Character): Character => {
  const updatedCharacter = { ...character };

  if (character.image === null) {
    updatedCharacter.image = noImage.src;
  }
  updatedCharacter.isSelected = false;
  return updatedCharacter;
};

export const getAllCharacters = async (
  filterWord = querySearchParam,
  pageNum = DefaultPage
): Promise<ApiResponse> => {
  const url =
    BaseUrl +
    DefaultOrder +
    Query +
    filterWord +
    Page +
    pageNum +
    Size +
    DefaultSize;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Unable to fetch');
  const results: ApiResponse = await response.json();
  return {
    ...results,
    items: Array.isArray(results.items)
      ? results.items.map((item) => transformCharacter(item))
      : [],
  };
};

export const getCharacter = async (id: number): Promise<Character> => {
  const response = await fetch(`${BaseUrl}/${id}`);
  if (!response.ok) throw new Error('Unable to fetch');
  const result: Character = await response.json();
  return transformCharacter(result);
};
