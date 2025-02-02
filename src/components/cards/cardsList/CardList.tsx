import React from 'react';

import { Card } from '../card/Card';
import { Character } from '../../../types';

import styles from './CardList.module.css';

export const CardList: React.FC<{
  items: Character[];
  onCardClick: (index: number) => void;
}> = React.memo(({ items, onCardClick }) => {
  const msgForEmptyArr = 'Unfortunately, nothing was found for your request.';
  const renderItems = items.map((item, index) => (
    <Card
      item={item}
      index={index + 1}
      key={item.id}
      onCardClick={onCardClick}
    />
  ));
  return (
    <div className={styles.cardListWrapper}>
      {renderItems.length > 0 ? renderItems : msgForEmptyArr}
    </div>
  );
});
