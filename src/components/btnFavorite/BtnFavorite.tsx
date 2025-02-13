import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import {
  selectCharacter,
  toggleFavoriteCharacter,
} from '@store/slices/charactersSlice';

import styles from './BtnFavorite.module.css';
import { Character } from '../../types';

export const BtnFavorite: React.FC<{ favoriteCharacter: Character }> = ({
  favoriteCharacter,
}) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(
    (state) =>
      state.characters.characters.find(
        (char) => char.id === favoriteCharacter.id
      )?.isSelected
  );

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleFavoriteCharacter(favoriteCharacter));
    dispatch(selectCharacter(favoriteCharacter.id));
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        handleToggle(e);
      }}
      className={styles.btnFavorite}
    >
      {isFavorite ? '❤️' : '💙'}
    </button>
  );
};
