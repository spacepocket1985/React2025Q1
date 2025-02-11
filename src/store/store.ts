import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { apiFuturama } from './slices/apiSlice';
import appDataReducer from './slices/appDataSlice';
import charactersReducer from './slices/charactersSlice';

export const rootReducer = combineReducers({
  [apiFuturama.reducerPath]: apiFuturama.reducer,
  appData: appDataReducer,
  characters: charactersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiFuturama.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
