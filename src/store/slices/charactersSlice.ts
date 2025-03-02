import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

type CharactersSliceType = {
  characters: Character[];
  selectedCharacters: Character[];
};

const initialState: CharactersSliceType = {
  characters: [],
  selectedCharacters: [],
};

const charactersSlice = createSlice({
  name: 'charactersData',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
      state.characters = state.characters.map((character) => {
        const isSelected = state.selectedCharacters.some(
          (selected) => selected.id === character.id
        );
        return { ...character, isSelected };
      });
    },
    selectCharacter: (state, action: PayloadAction<Character>) => {
      const indexForUpdate = state.selectedCharacters.findIndex(
        (char) => char.id === action.payload.id
      );
      state.selectedCharacters[indexForUpdate].isSelected =
        !state.selectedCharacters[indexForUpdate].isSelected;
    },

    toggleFavoriteCharacter: (state, action: PayloadAction<Character>) => {
      const index = state.selectedCharacters.findIndex(
        (char) => char.id === action.payload.id
      );

      if (index !== -1) {
        state.selectedCharacters.splice(index, 1);
      } else {
        state.selectedCharacters.push({ ...action.payload, isSelected: true });
      }
    },
    removeAllSelectedChars: (state) => {
      state.selectedCharacters = [];
    },
    unSelectAllCharacters: (state) => {
      state.characters.forEach((item) => {
        item.isSelected = false;
      });
    },
  },
});

export const {
  setCharacters,
  selectCharacter,
  removeAllSelectedChars,
  unSelectAllCharacters,
  toggleFavoriteCharacter,
} = charactersSlice.actions;

export default charactersSlice.reducer;
