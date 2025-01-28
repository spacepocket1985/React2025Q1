import { lazy } from 'react';

import { NotFound } from '../pages/NotFound';
import { RoutePaths } from './routePaths';

const LazyMain = lazy(() => import('../pages/Main'));

export const publicRoutes = [
  {
    path: RoutePaths.Main,
    Page: LazyMain,
  },

  {
    path: RoutePaths.PAGE404,
    Page: NotFound,
  },
];
