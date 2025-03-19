import { lazy } from 'react';

const LazyMain = lazy(() => import('@pages/main/ui/Page'));
import { NotFound } from '@pages/notFound/ui/Page';
import { RoutePaths } from './routePaths';

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
