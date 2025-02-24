import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import ErrorBoundary from '@components/error/errorBoundary/ErrorBoundary';

import { ThemeProvider } from '@context/ThemeContext';
import { wrapper } from '@store/store';

import '@styles/globals.css';

const MyApp = ({ Component, ...rest }: AppProps): React.JSX.Element => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
