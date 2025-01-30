import { ApiResponse } from '../../types';

const BaseUrl =
  'https://futuramaapi.com/api/characters?orderBy=id&orderByDirection=asc';
const Size = '&size=';
const Page = '&page=';
const Query = '&query=';

export const DefaultSize = '12';
export const DefaultPage = '1';
export const DefaultQuery = '';

export class FuturamaApi {
  getResource = async (url: string): Promise<ApiResponse> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getCharacters = async (
    filterWord = DefaultQuery,
    sizeNum = DefaultSize,
    pageNum = DefaultPage
  ): Promise<ApiResponse> => {
    const result = await this.getResource(
      BaseUrl + Query + filterWord + Page + pageNum + Size + sizeNum
    );
    return result;
  };
}
