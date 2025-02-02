import React from 'react';
import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchBarProps = {
  onSetQuery: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ onSetQuery }) => {
    const [searchTerm, setSearchTerm] = useLocalStorage();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const handleSubmit = () => {
      const trimmedSearchTerm = searchTerm!.trim();
      setSearchTerm(trimmedSearchTerm);
      onSetQuery(trimmedSearchTerm);
    };

    return (
      <>
        <img className={styles.searchBarPic} src={HeaderPic} alt="header pic" />
        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            value={searchTerm || ''}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>search</button>
        </div>
      </>
    );
  }
);
