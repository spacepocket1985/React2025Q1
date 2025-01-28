import React from 'react';

import { Card } from '../card/Card';
import { Character } from '../../../types';

import styles from './CardList.module.css';

export const CardList: React.FC<{ items: Character[] }> = React.memo(
  ({ items }) => {
    const msgForEmptyArr = 'Unfortunately, nothing was found for your request.';
    const renderItems = items.map((item) => <Card item={item} key={item.id} />);
    return (
      <div className={styles.cardListWrapper}>
        {renderItems.length > 0 ? renderItems : msgForEmptyArr}
      </div>
    );
  }
);
