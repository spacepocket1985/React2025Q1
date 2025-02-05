import React, { useState, useEffect } from 'react';

import styles from './CardDetails.module.css';
import { Character } from '../../../types';
import { FuturamaApi } from '../../../service/futuramaAPI';
import { Spinner } from '../../spinner/Spinner';

export const CardDetails: React.FC<{
  itemId: string;
  onCardClose: () => void;
}> = React.memo(({ itemId, onCardClose }) => {
  const [character, setCharacter] = useState<null | Character>(null);
  const { getCharacter, loading } = FuturamaApi();

  useEffect(() => {
    const fetchCharacter = async () => {
      const characterData = await getCharacter(itemId);
      setCharacter(characterData);
    };

    fetchCharacter();
  }, [getCharacter, itemId]);

  const handleCloseDetails = () => {
    setCharacter(null);
    onCardClose();
  };

  if (loading) {
    return <Spinner />;
  }

  if (!character) {
    return <p>{'Unfortunately, nothing was found for your request.'}</p>;
  }

  return (
    <div className={styles.cardWrapper}>
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
});
