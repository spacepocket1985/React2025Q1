import { CardList } from '@components/cards/cardsList/CardList';
import { CardDetails } from '@components/cards/cardDetails/CardDetails';
import { SearchBar } from '@components/searchBar/SearchBar';
import { Pagination } from '@components/pagination/Pagination';
import { CardInformer } from '@components/cards/cardsInformer/CardsInformer';
import { DefaultPage, getAllCharacters } from '@service/futuramaAPI';
import { Spinner } from '@components/spinner/Spinner';
import { Suspense } from 'react';
import styles from './page.module.css';

const Main: React.FC<{
  searchParams: { [key: string]: string };
}> = async ({ searchParams }) => {
  const { query, page: currentPage, cardDetails } = await searchParams;
  const pageNum = currentPage ? Number(currentPage) : DefaultPage;
  const { page, pages } = await getAllCharacters(query, pageNum);

  return (
    <main className={styles.main}>
      <SearchBar />
      <Pagination currentPage={page} totalPages={pages} />
      <div className={styles.wrapper}>
        <CardList query={query} currentPage={page} />
        {cardDetails && (
          <Suspense key="details" fallback={<Spinner />}>
            <CardDetails id={cardDetails} />
          </Suspense>
        )}
      </div>
      <CardInformer />
    </main>
  );
};

export default Main;
