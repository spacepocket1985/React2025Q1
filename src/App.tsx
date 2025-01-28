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
    items: [],
    total: 0,
    query: getSearchTermFromLS(),
    page: 1,
    pages: 1,
  });

  const { getCharacters, error, loading } = FuturamaApi();

  const { items, query, page } = appData;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters(query, page);
      setAppData((prevAppData) => {
        return {
          ...prevAppData,
          ...data,
        };
      });
    };
    fetchData();
  }, [getCharacters, page, query]);

  return (
    <>
      <SearchBar onSearch={getCharacters} />
      {error && <ErrorMessage errorMsg={error} />}
      {!error && loading && <Spinner />}
      {!error && !loading && <CardList items={items} />}
    </>
  );
};

export default App;
