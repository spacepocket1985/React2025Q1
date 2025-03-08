import { NotFound } from '@pages/NotFound';
import { RoutePaths } from '@routes/routePaths';
import { type RouteObject } from 'react-router';

export const notFound: RouteObject = {
  path: RoutePaths.PAGE404,
  element: <NotFound />,
};
