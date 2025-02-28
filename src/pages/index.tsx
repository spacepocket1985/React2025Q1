import { useEffect, useRef } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CardList } from '@components/cards/cardsList/CardList';
import { CardDetails } from '@components/cards/cardDetails/CardDetails';
import { ErrorMessage } from '@components/error/errorMessage/ErrorMessage';
import { SearchBar } from '@components/searchBar/SearchBar';
import { Spinner } from '@components/spinner/Spinner';
import { Pagination } from '@components/pagination/Pagination';
import { CardInformer } from '@components/cards/cardsInformer/CardsInformer';
import { useRouter } from 'next/router';
import {
  apiFuturama,
  getAllCharacters,
  getCharacter,
} from '@store/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { cardClose, setLoading } from '@store/slices/appDataSlice';
import { DefaultPage, DefaultQuery } from '@service/futuramaAPI';
import { setCharacters } from '@store/slices/charactersSlice';

import styles from './Main.module.css';
import { wrapper } from '@store/store';
import { SerializedError } from '@reduxjs/toolkit';
import { ApiResponse, Character } from '../types/index';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNum = Number(context.query.page?.toString()) || DefaultPage;
    const filterWord = context.query.query?.toString() || DefaultQuery;
    const cardDetails = context.query.cardDetails?.toString() || DefaultQuery;

    const response = await store.dispatch(
      getAllCharacters.initiate({
        filterWord,
        pageNum,
      })
    );

    let responseWithDetails = null;

    if (response.data && response.data.items && cardDetails) {
      const index = Number(cardDetails);
      if (index >= 0 && index < response.data.items.length) {
        const characterId = response.data.items[index - 1].id;

        responseWithDetails = await store.dispatch(
          getCharacter.initiate(String(characterId))
        );
      }
    }

    await Promise.all(
      store.dispatch(apiFuturama.util.getRunningQueriesThunk())
    );

    return {
      props: {
        response,
        responseWithDetails,
      },
    };
  }
);

export type SearchPagePropsType = {
  response: {
    data: ApiResponse;
    error: FetchBaseQueryError | SerializedError | null;
  };
  responseWithDetails: { data: Character };
};

const Main: React.FC<SearchPagePropsType> = ({
  response,
  responseWithDetails,
}) => {
  const cardListRef = useRef(null);
  const mainRef = useRef(null);

  const router = useRouter();

  const {
    page: currentPage,
    cardDetails,
    query,
    isLoading,
  } = useAppSelector((state) => state.appData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (response.data && response.data.items) {
      dispatch(setLoading(false));
      const { items } = response.data;
      dispatch(setCharacters(items));
      const queryStr = {
        query,
        page: String(currentPage),
        ...(cardDetails !== '' && { cardDetails }),
      };

      if (JSON.stringify(router.query) !== JSON.stringify(queryStr)) {
        router.replace({ pathname: '/', query: queryStr });
      }
    }
  }, [response.data, router, cardDetails, currentPage, dispatch, query]);

  const onMainClick = (e: React.MouseEvent): void => {
    if (e.target === cardListRef.current || e.target === mainRef.current) {
      dispatch(cardClose());
    }
  };

  const cardsOrSpinner = isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.wrapper}>
      <CardList ref={cardListRef} characters={response.data.items} />
      {!isLoading && cardDetails && !responseWithDetails && <Spinner />}
      {responseWithDetails?.data && cardDetails && (
        <CardDetails character={responseWithDetails.data} />
      )}
    </div>
  );

  const errorMsg = response.error ? (
    <ErrorMessage errorMsg={JSON.stringify(response.error)} />
  ) : null;

  return (
    <main className={styles.main} ref={mainRef} onClick={onMainClick}>
      <SearchBar />
      <Pagination
        currentPage={response.data.page}
        totalPages={response.data.total}
      />
      {cardsOrSpinner}
      <CardInformer />
      {errorMsg}
    </main>
  );
};

export default Main;
