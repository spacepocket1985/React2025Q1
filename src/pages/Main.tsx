import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CardList } from '../components/cards/cardsList/CardList';
import { CardDetails } from '../components/cards/cardDetails/CardDetails';
import { ErrorMessage } from '../components/error/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { Pagination } from '../components/pagination/Pagination';

import { useGetAllCharactersQuery } from '../store/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { cardClose, setPagination } from '../store/slices/appDataSlice';
import { DefaultQuery } from '../service/futuramaAPI';

import { setCharacters } from '../store/slices/charactersSlice';
import styles from './Main.module.css';
import { CardInformer } from '../components/cards/cardsInformer/CardsInformer';

const Main: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const cardListRef = useRef(null);
  const mainRef = useRef(null);

  const { page, cardDetails, query } = useAppSelector((state) => state.appData);
  const { characters } = useAppSelector((state) => state.characters);
  const dispatch = useAppDispatch();

  const { data, isFetching, error } = useGetAllCharactersQuery({
    filterWord: query,
    pageNum: page,
  });

  useEffect(() => {
    if (data) {
      const { pages, page, items } = data;
      dispatch(setPagination({ page, pages }));
      dispatch(setCharacters(items));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setSearchParams({
      ...(page !== undefined && { page: String(page) }),
      ...(query !== DefaultQuery && { query }),
      ...(cardDetails !== DefaultQuery && {
        cardDetails: characters[Number(cardDetails) - 1]
          ? String(cardDetails)
          : DefaultQuery,
      }),
    });
  }, [page, setSearchParams, query, cardDetails, dispatch, characters]);

  const onMainClick = (e: React.MouseEvent): void => {
    if (e.target === cardListRef.current || e.target === mainRef.current) {
      dispatch(cardClose());
    }
  };

  const cardsOrSpinner = isFetching ? (
    <Spinner />
  ) : (
    <div className={styles.wrapper}>
      <CardList ref={cardListRef} />
      {cardDetails && <CardDetails />}
    </div>
  );

  let errorMsg = 'Error. Something went wrong!';
  if (error) {
    if ('status' in error) {
      const fetchError = error as FetchBaseQueryError;
      errorMsg = `Error! ${fetchError.status}`;
    }
  }

  return (
    <main ref={mainRef} onClick={onMainClick}>
      <SearchBar />
      <Pagination />
      {cardsOrSpinner}
      <CardInformer />
      {error && <ErrorMessage errorMsg={errorMsg} />}
    </main>
  );
};

export default Main;
