import {
  apiFuturama,
  useGetAllCharactersQuery,
  useGetCharacterQuery,
} from '@store/slices/apiSlice';

export type EmptyPropsType = object;

export type EmptyStateType = object;

export type Character = {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  status: 'ALIVE' | 'DEAD' | 'UNKNOWN';
  species: string;
  createdAt: string;
  image: string;
  isSelected: boolean;
};

export type ApiResponse = {
  items: Character[];
  total: number;
  page: number;
  size: number;
  pages: number;
};

export type AppState = Omit<ApiResponse, 'size'> & {
  query: string;
  cardDetails: string;
};

export type AppDataSliceType = Omit<ApiResponse, 'size' | 'items'> & {
  query: string;
  cardDetails: string;
};

export type SearchBarState = { searchTerm: string };

export type ReduxApiMockType = {
  useGetAllCharactersQuery: typeof useGetAllCharactersQuery;
  useGetCharacterQuery: typeof useGetCharacterQuery;
  reducer: ReturnType<typeof apiFuturama.reducer>;
  reducerPath: string;
};
