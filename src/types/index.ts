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
};

export type SearchBarState = { searchTerm: string };
