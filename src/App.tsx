import { useEffect, useState } from 'react';

import { Spinner } from './components/spinner/Spinner';
import { SearchBar } from './components/searchBar/SearchBar';
import { CardList } from './components/cards/cardsList/CardList';

import { AppState } from './types';
import { ErrorMessage } from './components/error/errorMessage/ErrorMessage';
import { getSearchTermFromLS } from './utils/localStorageActions';
import { FuturamaApi } from './service/futuramaAPI';

import './App.css';

export const App: React.FC = () => {
  const [appData, setAppData] = useState<AppState>({
    charactersList: [],
    query: getSearchTermFromLS(),
    page: '1',
  });

  const { getCharacters, error, loading } = FuturamaApi();

  const { charactersList, query } = appData;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters(query);
      setAppData({ ...appData, charactersList: data.items });
    };
    fetchData();
  }, [appData, getCharacters, query]);

  return (
    <>
      <SearchBar onSearch={getCharacters} />
      {error && <ErrorMessage errorMsg={error} />}
      {!error && loading && <Spinner />}
      {!error && !loading && <CardList items={charactersList} />}
    </>
  );
};

export default App;
