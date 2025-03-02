import { Card } from '../card/Card';
import { getAllCharacters } from '@service/futuramaAPI';
import { Spinner } from '@components/spinner/Spinner';
import { Suspense } from 'react';
import styles from './CardList.module.css';

export const CardList: React.FC<{
  query: string;
  currentPage: number;
}> = async ({ query, currentPage }) => {
  const msgForEmptyArr = 'Unfortunately, nothing was found for your request.';

  if (!query && !currentPage) return;

  const { items: characters } = await getAllCharacters(
    query,
    Number(currentPage)
  );

  const renderItems = characters.map((item) => (
    <Card item={item} key={item.id} />
  ));

  return (
    <div className={styles.cardListWrapper}>
      <Suspense key="details" fallback={<Spinner />}>
        {renderItems.length > 0 ? renderItems : msgForEmptyArr}
      </Suspense>
    </div>
  );
};
