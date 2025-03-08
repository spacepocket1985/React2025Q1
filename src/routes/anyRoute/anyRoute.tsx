import { RoutePaths } from '@routes/routePaths';
import { Navigate, type RouteObject } from 'react-router';

export const anyRoute: RouteObject = {
  path: RoutePaths.AnyRout,
  element: <Navigate to={RoutePaths.PAGE404} replace={true} />,
};
