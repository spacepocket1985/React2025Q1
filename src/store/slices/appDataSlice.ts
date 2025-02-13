import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultQuery, DefaultPage } from '@service/futuramaAPI';
import { AppDataSliceType } from '../../types';
import {
  detailsSearchParam,
  pageSearchParam,
  querySearchParam,
} from '@utils/getPageSearchParams';

const initialState: AppDataSliceType = {
  total: 0,
  query: querySearchParam || DefaultQuery,
  page: pageSearchParam,
  pages: DefaultPage,
  cardDetails: detailsSearchParam || DefaultQuery,
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = DefaultPage;
      state.cardDetails = DefaultQuery;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.cardDetails = DefaultQuery;
    },
    cardOpen: (state, action: PayloadAction<number>) => {
      state.cardDetails = state.cardDetails
        ? DefaultQuery
        : String(action.payload);
    },
    cardClose: (state) => {
      state.cardDetails = DefaultQuery;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; pages: number }>
    ) => {
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },
  },
});

export default appDataSlice.reducer;
export const { setPage, setQuery, cardClose, cardOpen, setPagination } =
  appDataSlice.actions;
