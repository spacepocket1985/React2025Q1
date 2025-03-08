import { RouterProvider } from 'react-router/dom';
import { AppRouter } from './routes/AppRouter';

import { ThemeSwitcher } from './components/themeSwitcher/ThemeSwitcher';
import './App.css';

export const App = () => {
  return (
    <>
      <ThemeSwitcher />
      <RouterProvider router={AppRouter} />
    </>
  );
};

export default App;
