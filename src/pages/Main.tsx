import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { CardList } from '../components/cards/cardsList/CardList';
import { ErrorMessage } from '../components/error/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { DefaultPage, DefaultQuery, FuturamaApi } from '../service/futuramaAPI';
import { AppState } from '../types';

import styles from './Main.module.css';

import { Pagination } from '../components/pagination/Pagination';
import {
  detailsSearchParam,
  pageSearchParam,
  querySearchParam,
} from '../utils/getPageSearchParams';
import { CardDetails } from '../components/cards/cardDetails/CardDetails';

const Main: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  const cardListRef = useRef(null);
  const mainRef = useRef(null);

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
      cardDetails: DefaultQuery,
    }));
  }, []);

  const onPageChange = useCallback((newPageNume: number) => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      page: newPageNume,
      cardDetails: DefaultQuery,
    }));
  }, []);

  const onCardClick = useCallback(
    (index: number) => {
      const cardDetailsParam = cardDetails ? DefaultQuery : String(index);
      setAppData((prevData) => ({
        ...prevData,
        cardDetails: cardDetailsParam,
      }));
    },
    [cardDetails]
  );

  const onCardClose = useCallback(() => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      cardDetails: DefaultQuery,
    }));
  }, []);

  const onMainClick = (e: React.MouseEvent): void => {
    if (e.target === cardListRef.current || e.target === mainRef.current) {
      setAppData((prevAppData) => ({
        ...prevAppData,
        cardDetails: DefaultQuery,
      }));
    }
  };

  return (
    <main ref={mainRef} onClick={onMainClick}>
      <SearchBar onSetQuery={onSetQuery} />
      <Pagination
        onPageChange={onPageChange}
        totalPages={pages}
        currentPage={page}
      />
      {error && <ErrorMessage errorMsg={error} />}
      {!error && loading && <Spinner />}
      {!error && !loading && (
        <div className={styles.wrapper}>
          <CardList items={items} onCardClick={onCardClick} ref={cardListRef} />
          {cardDetails && (
            <CardDetails
              itemId={String(items[Number(cardDetails) - 1].id)}
              page={page}
              onCardClose={onCardClose}
            />
          )}
          <Outlet />
        </div>
      )}
    </main>
  );
};

export default Main;
