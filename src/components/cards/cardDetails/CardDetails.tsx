import React from 'react';
import Image from 'next/image';
import { BtnFavorite } from '../../btnFavorite/BtnFavorite';
import { getCharacter } from '@service/futuramaAPI';
import { BtnClose } from '@components/btnClose/BtnClose';
import styles from './CardDetails.module.css';

export const CardDetails: React.FC<{ id: string }> = async ({ id }) => {
  if (!id) return;
  const character = await getCharacter(Number(id));
  return (
    <div className={styles.cardWrapper}>
      <BtnFavorite favoriteCharacter={character} />
      <BtnClose />
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
};
