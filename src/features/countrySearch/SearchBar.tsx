import React, { useState } from 'react';
import FlagsPic from '@assets/flags.png';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    setSearchTerm(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <>
      <img className={styles.searchBarPic} src={FlagsPic} alt="header pic" />
      <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          data-testid="searchInput"
        />
        <button type="submit" data-testid="searchSubmit">
          {'search'}
        </button>
      </form>
    </>
  );
};
