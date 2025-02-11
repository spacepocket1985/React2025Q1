import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
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

import styles from './Main.module.css';
import { setCharacters } from '../store/slices/charactersSlice';

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

  const onMainClick = useCallback(
    (e: React.MouseEvent): void => {
      if (e.target === cardListRef.current || e.target === mainRef.current) {
        dispatch(cardClose());
      }
    },
    [dispatch]
  );

  const contentOrSpinner = isFetching ? (
    <Spinner />
  ) : (
    <>
      <div className={styles.wrapper}>
        <CardList ref={cardListRef} />
        {cardDetails && (
          <CardDetails
            itemId={String(data?.items[Number(cardDetails) - 1].id)}
          />
        )}
      </div>
    </>
  );

  return (
    <main ref={mainRef} onClick={onMainClick}>
      <SearchBar />
      <Pagination />
      {contentOrSpinner}
      {error && <ErrorMessage errorMsg={error.toString()} />}
    </main>
  );
};

export default Main;
