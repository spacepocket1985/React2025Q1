import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { apiFuturama } from './slices/apiSlice';
import appDataReducer from './slices/appDataSlice';
import charactersReducer from './slices/charactersSlice';

const makeStore = () => {
  const rootReducer = combineReducers({
    [apiFuturama.reducerPath]: apiFuturama.reducer,
    appData: appDataReducer,
    characters: charactersReducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiFuturama.middleware),
  });
};

export type RootState = {
  [apiFuturama.reducerPath]: ReturnType<typeof apiFuturama.reducer>;
  appData: ReturnType<typeof appDataReducer>;
  characters: ReturnType<typeof charactersReducer>;
};

export const storeInstance = makeStore();

export type AppRootState = ReturnType<typeof storeInstance.getState>;

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
