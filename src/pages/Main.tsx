import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from '../components/cards/cardsList/CardList';
import { ErrorMessage } from '../components/error/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { FuturamaApi } from '../service/futuramaAPI';
import { AppState } from '../types';
import { getSearchTermFromLS } from '../utils/localStorageActions';

const Main: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
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

  useEffect(() => {
    setSearchParams({
      ...(page !== undefined && { page: String(page) }),
      ...(query !== '' && { query }),
    });
  }, [page, setSearchParams, query]);

  return (
    <>
      <SearchBar onSearch={getCharacters} />
      {error && <ErrorMessage errorMsg={error} />}
      {!error && loading && <Spinner />}
      {!error && !loading && <CardList items={items} />}
    </>
  );
};

export default Main;
