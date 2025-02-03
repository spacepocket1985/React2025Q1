import React, { useState, useEffect } from 'react';

import styles from './CardDetails.module.css';
import { Character } from '../../../types';
import { FuturamaApi } from '../../../service/futuramaAPI';
import { Spinner } from '../../spinner/Spinner';

export const CardDetails: React.FC<{
  itemId: string;
  page: number;
  onCardClose: () => void;
}> = React.memo(({ itemId, page, onCardClose }) => {
  const [character, setCharacter] = useState<null | Character>(null);

  const { getCharacter, loading } = FuturamaApi();

  useEffect(() => {
    const fetchCharacter = async () => {
      const id = page === 1 ? itemId : String((page - 1) * 12 + Number(itemId));
      const character = await getCharacter(id);
      setCharacter(character);
    };
    fetchCharacter();
  }, [getCharacter, itemId, page]);

  const handleCloseDetails = () => {
    setCharacter(null);
    onCardClose();
  };

  if (!character) return;

  const contentOrSpinner = loading ? (
    <Spinner />
  ) : (
    <>
      <button className={styles.btnClose} onClick={handleCloseDetails}>
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
    </>
  );

  return <div className={styles.cardWrapper}>{contentOrSpinner}</div>;
});
