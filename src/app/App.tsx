import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routing/AppRouter';

import './App.scss';

export const App = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
