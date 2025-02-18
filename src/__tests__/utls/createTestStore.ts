import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { apiFuturama } from '@store/slices/apiSlice';
import appDataReducer from '@store/slices/appDataSlice';
import charactersReducer from '@store/slices/charactersSlice';
import { AppRootState } from '@store/store';

export const createTestStore = (preloadedState?: Partial<AppRootState>) => {
  const rootReducer = combineReducers({
    [apiFuturama.reducerPath]: apiFuturama.reducer,
    appData: appDataReducer,
    characters: charactersReducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiFuturama.middleware),
    preloadedState,
  });
};
