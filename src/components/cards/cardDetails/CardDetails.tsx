import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { useAppDispatch } from '@hooks/storeHooks';
import { cardClose } from '@store/slices/appDataSlice';

import styles from './CardDetails.module.css';
import { BtnFavorite } from '../../btnFavorite/BtnFavorite';
import { Character } from '../../../types/index';
import { Spinner } from '@components/spinner/Spinner';

export const CardDetails: React.FC<{ character: Character }> = React.memo(
  ({ character }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (character) setIsLoading(false);
    }, [character]);
    const handleCloseDetails = () => {
      dispatch(cardClose());
    };

    if (!character && !isLoading) {
      return <p>{'Unfortunately, nothing was found for your request.'}</p>;
    }

    return isLoading ? (
      <Spinner />
    ) : (
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
          width={100}
          height={100}
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
