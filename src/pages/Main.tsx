import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from '../components/cards/cardsList/CardList';
import { ErrorMessage } from '../components/error/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { FuturamaApi } from '../service/futuramaAPI';
import { AppState } from '../types';
import { getSearchTermFromLS } from '../utils/localStorageActions';
import { Pagination } from '../components/pagination/Pagination';

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

  const { items, query, page, pages } = appData;

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

  const onSetQuery = useCallback((newQuery: string) => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      query: newQuery,
    }));
  }, []);

  const onPageChange = useCallback((newPageNume: number) => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      page: newPageNume,
    }));
  }, []);

  return (
    <>
      <SearchBar onSetQuery={onSetQuery} />
      <Pagination
        onPageChange={onPageChange}
        totalPages={pages}
        currentPage={page}
      />
      {error && <ErrorMessage errorMsg={error} />}
      {!error && loading && <Spinner />}
      {!error && !loading && <CardList items={items} />}
    </>
  );
};

export default Main;
