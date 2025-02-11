import React from 'react';
import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DefaultQuery } from '../../service/futuramaAPI';
import { useAppDispatch } from '../../hooks/storeHooks';
import { setQuery } from '../../store/slices/appDataSlice';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const dispatch = useAppDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm!.trim();
    setSearchTerm(trimmedSearchTerm);
    dispatch(setQuery(trimmedSearchTerm));
  };

  return (
    <>
      <img className={styles.searchBarPic} src={HeaderPic} alt="header pic" />
      <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm || DefaultQuery}
          onChange={handleInputChange}
          data-testid="searchInput"
        />
        <button type="submit" data-testid="serachSubmit">
          search
        </button>
      </form>
    </>
  );
};
