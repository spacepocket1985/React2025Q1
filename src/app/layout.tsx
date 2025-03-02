import React, { Suspense } from 'react';
import { Providers } from './providers';
import { ThemeSwitcher } from '@components/themeSwitcher/ThemeSwitcher';
import '../styles/globals.css';
import { Spinner } from '@components/spinner/Spinner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense key="main" fallback={<Spinner />}>
            <ThemeSwitcher />
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
