import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from '../components/cards/cardsList/CardList';
import { ErrorMessage } from '../components/error/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { DefaultPage, DefaultQuery, FuturamaApi } from '../service/futuramaAPI';
import { AppState } from '../types';

import { Pagination } from '../components/pagination/Pagination';
import {
  detailsSearchParam,
  pageSearchParam,
  querySearchParam,
} from '../utils/getPageSearchParams';
import { CardDetails } from '../components/cards/cardDetails/CardDetails';

const Main: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const [appData, setAppData] = useState<AppState>({
    items: [],
    total: 0,
    query: querySearchParam || DefaultQuery,
    page: pageSearchParam,
    pages: DefaultPage,
    cardDetails: detailsSearchParam || DefaultQuery,
  });

  const { getCharacters, error, loading } = FuturamaApi();

  const { items, query, page, pages, cardDetails } = appData;

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
      ...(cardDetails !== '' && {
        cardDetails: items[Number(cardDetails) - 1] ? String(cardDetails) : '',
      }),
    });
  }, [page, setSearchParams, query, cardDetails, items]);

  const onSetQuery = useCallback((newQuery: string) => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      query: newQuery,
      page: DefaultPage,
    }));
  }, []);

  const onPageChange = useCallback((newPageNume: number) => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      page: newPageNume,
      cardDetails: DefaultQuery,
    }));
  }, []);

  const onCardClick = useCallback((index: number) => {
    setAppData((prevData) => ({
      ...prevData,
      cardDetails: String(index),
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
      {!error && !loading && (
        <>
          <CardList items={items} onCardClick={onCardClick} />
          {cardDetails && <CardDetails itemId={cardDetails} page={page} />}
        </>
      )}
    </>
  );
};

export default Main;
