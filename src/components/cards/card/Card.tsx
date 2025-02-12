import React from 'react';
import { Character } from '../../../types';
import { BtnFavorite } from '../../btnFavorite/BtnFavorite';

import styles from './Card.module.css';

export const Card: React.FC<{
  item: Character;
  index: number;
  onCardClick: (index: number) => void;
}> = React.memo(({ item, index, onCardClick }) => {
  return (
    <div
      className={styles.cardWrapper}
      onClick={() => onCardClick(index)}
      data-testid="card"
    >
      <BtnFavorite favoriteCharacter={item} />
      <img className={styles.cardImg} src={item.image} alt={item.name} />
      <p className={styles.cardTitle}>{item.name}</p>
    </div>
  );
});
