import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

import { ThemeSwitcher } from './components/themeSwitcher/ThemeSwitcher';
import './App.css';

export const App = () => {
  return (
    <Router>
      <ThemeSwitcher />
      <AppRouter />
    </Router>
  );
};

export default App;
