import { CardList } from '@components/cards/cardsList/CardList';
import { CardDetails } from '@components/cards/cardDetails/CardDetails';
import { SearchBar } from '@components/searchBar/SearchBar';
import { Pagination } from '@components/pagination/Pagination';
import { CardInformer } from '@components/cards/cardsInformer/CardsInformer';

import { getAllCharacters } from '@service/futuramaAPI';

import styles from './page.module.css';

type SearchParams = {
  query?: string;
  page?: number;
  cardDetails?: string;
};

const Main: React.FC<{ searchParams?: SearchParams }> = async ({
  searchParams = {},
}) => {
  const { query, page: currentPage, cardDetails } = await searchParams;
  const { page, pages } = await getAllCharacters(query, currentPage);

  return (
    <main className={styles.main}>
      <SearchBar />
      <Pagination currentPage={page} totalPages={pages} />
      <div className={styles.wrapper}>
        <CardList query={query} currentPage={page} />
        <CardDetails id={cardDetails} />
      </div>
      <CardInformer />
    </main>
  );
};

export default Main;
