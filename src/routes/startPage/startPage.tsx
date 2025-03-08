import Main from '@pages/Main';
import { RoutePaths } from '@routes/routePaths';
import { type RouteObject } from 'react-router';

export const startPage: RouteObject = {
  path: RoutePaths.Main,
  element: <Main />,
};
