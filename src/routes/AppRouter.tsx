import { createBrowserRouter } from 'react-router';
import { anyRoute } from './anyRoute/anyRoute';
import { notFound } from './notFound/notFound';
import { startPage } from './startPage/startPage';

export const AppRouter = createBrowserRouter([startPage, notFound, anyRoute]);
