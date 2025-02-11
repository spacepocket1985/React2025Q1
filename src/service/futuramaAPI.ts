import { Character } from '../types';
import noImage from '../assets/noImage.png';

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
    updatedCharacter.image = noImage;
  }
  updatedCharacter.isSelected = false;
  return updatedCharacter;
};
