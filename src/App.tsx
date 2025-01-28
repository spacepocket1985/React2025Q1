import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

import './App.css';

export const App = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
