import React, { useState, useEffect } from 'react';

import styles from './CardDetails.module.css';
import { Character } from '../../../types';
import { FuturamaApi } from '../../../service/futuramaAPI';

export const CardDetails: React.FC<{
  itemId: string;
  page: number;
}> = React.memo(({ itemId, page }) => {
  const [character, setCharacter] = useState<null | Character>(null);
  const { getCharacter } = FuturamaApi();

  useEffect(() => {
    const fetchCharacter = async () => {
      const id = page === 1 ? itemId : String((page - 1) * 12 + Number(itemId));
      const character = await getCharacter(id);
      setCharacter(character);
    };
    fetchCharacter();
  }, [getCharacter, itemId, page]);

  if (!character) return;

  return (
    <div className={styles.cardWrapper}>
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
