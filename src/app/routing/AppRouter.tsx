import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './appRoutes';
import { RoutePaths } from './routePaths';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={RoutePaths.Main} replace />} />
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
