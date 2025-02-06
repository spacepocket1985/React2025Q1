import React from 'react';
import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DefaultQuery } from '../../service/futuramaAPI';

type SearchBarProps = {
  onSetQuery: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ onSetQuery }) => {
    const [searchTerm, setSearchTerm] = useLocalStorage();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedSearchTerm = searchTerm!.trim();
      setSearchTerm(trimmedSearchTerm);
      onSetQuery(trimmedSearchTerm);
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
  }
);
