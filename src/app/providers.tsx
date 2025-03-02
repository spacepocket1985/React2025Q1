// app/providers.tsx
'use client';

import ErrorBoundary from '@components/error/errorBoundary/ErrorBoundary';
import { ThemeProvider } from '@context/ThemeContext';
import { storeInstance } from '@store/store';
import { Provider } from 'react-redux';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={storeInstance}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
