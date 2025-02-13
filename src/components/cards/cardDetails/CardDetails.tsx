import React from 'react';

import { Spinner } from '../../spinner/Spinner';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { cardClose } from '@store/slices/appDataSlice';
import { useGetCharacterQuery } from '@store/slices/apiSlice';

import styles from './CardDetails.module.css';
import { BtnFavorite } from '../../btnFavorite/BtnFavorite';

export const CardDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cardDetails } = useAppSelector((state) => state.appData);
  const { characters } = useAppSelector((state) => state.characters);

  const itemId = String(characters[Number(cardDetails) - 1].id);
  const { data: character, isFetching } = useGetCharacterQuery(itemId);
  const handleCloseDetails = () => {
    dispatch(cardClose());
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (!character) {
    return <p>{'Unfortunately, nothing was found for your request.'}</p>;
  }

  return (
    <div className={styles.cardWrapper}>
      <BtnFavorite favoriteCharacter={characters[Number(cardDetails) - 1]} />
      <button
        data-testid="closeDetailsBtn"
        className={styles.btnClose}
        onClick={handleCloseDetails}
      >
        X
      </button>
      <img
        className={styles.cardImg}
        src={character.image}
        alt={character.name}
      />
      <p className={styles.cardTitle}>{character.name}</p>
      <p className={styles.cardTitle}>{`Gender - ${character.gender}`}</p>
      <p className={styles.cardTitle}>{`Status - ${character.status}`}</p>
    </div>
  );
};
