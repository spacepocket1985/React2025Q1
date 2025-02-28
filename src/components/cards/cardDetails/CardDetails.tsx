import React from 'react';
import Image from 'next/image';

import { useAppDispatch } from '@hooks/storeHooks';
import { cardClose } from '@store/slices/appDataSlice';

import styles from './CardDetails.module.css';
import { BtnFavorite } from '../../btnFavorite/BtnFavorite';
import { Character } from '../../../types/index';

export const CardDetails: React.FC<{ character: Character }> = React.memo(
  ({ character }) => {
    const dispatch = useAppDispatch();

    const handleCloseDetails = () => {
      dispatch(cardClose());
    };

    if (!character) {
      return <p>{'Unfortunately, nothing was found for your request.'}</p>;
    }

    return (
      <div className={styles.cardWrapper}>
        <BtnFavorite favoriteCharacter={character} />
        <button
          data-testid="closeDetailsBtn"
          className={styles.btnClose}
          onClick={handleCloseDetails}
        >
          X
        </button>
        <Image
          width={300}
          height={300}
          className={styles.cardImg}
          src={character.image}
          alt={character.name}
        />
        <p className={styles.cardTitle}>{character.name}</p>
        <p className={styles.cardTitle}>{`Gender - ${character.gender}`}</p>
        <p className={styles.cardTitle}>{`Status - ${character.status}`}</p>
      </div>
    );
  }
);
