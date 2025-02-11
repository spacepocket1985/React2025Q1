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
    selectCharacter: (state, action: PayloadAction<number>) => {
      const indexForUpdate = state.characters.findIndex(
        (char) => char.id === action.payload
      );
      state.characters[indexForUpdate].isSelected =
        !state.characters[indexForUpdate].isSelected;
    },
    addSelectedChar: (state, action: PayloadAction<Character>) => {
      if (
        !state.selectedCharacters.find((item) => item.id === action.payload.id)
      )
        state.selectedCharacters.push(action.payload);
    },
    removeSelectedChar: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (item) => item.id !== action.payload
      );
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
  addSelectedChar,
  removeSelectedChar,
  removeAllSelectedChars,
  unSelectAllCharacters,
} = charactersSlice.actions;

export default charactersSlice.reducer;
