'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Character } from '../../../types';
import { BtnFavorite } from '../../btnFavorite/BtnFavorite';

import styles from './Card.module.css';

export const Card: React.FC<{
  item: Character;
  index: number;
}> = React.memo(({ item }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onCardClick = () => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('cardDetails', String(item.id));

    router.push(`/?${newParams.toString()}`);
  };
  return (
    <div
      className={styles.cardWrapper}
      onClick={() => onCardClick()}
      data-testid="card"
    >
      <BtnFavorite favoriteCharacter={item} />
      <Image
        width={260}
        height={200}
        className={styles.cardImg}
        src={item.image}
        alt={item.name}
      />

      <p className={styles.cardTitle}>{item.name}</p>
    </div>
  );
});
