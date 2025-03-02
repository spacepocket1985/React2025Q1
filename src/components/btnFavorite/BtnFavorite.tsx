'use client';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { toggleFavoriteCharacter } from '@store/slices/charactersSlice';

import styles from './BtnFavorite.module.css';
import { Character } from '../../types';

export const BtnFavorite: React.FC<{ favoriteCharacter: Character }> = ({
  favoriteCharacter,
}) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.characters.selectedCharacters.find(
      (char) => char.id === favoriteCharacter.id
    )
  );

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleFavoriteCharacter(favoriteCharacter));
  };

  return (
    <button
      type="button"
      data-testid="btnFavorite"
      onClick={(e) => {
        handleToggle(e);
      }}
      className={styles.btnFavorite}
    >
      {isFavorite ? '❤️' : '💙'}
    </button>
  );
};
