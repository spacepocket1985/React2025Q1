import React from 'react';
import { Character } from '../../../types';

import styles from './Card.module.css';

export const Card: React.FC<{ item: Character }> = React.memo(({ item }) => {
  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImg} src={item.image} alt={item.name} />
      <p className={styles.cardTitle}>{item.name}</p>
    </div>
  );
});
