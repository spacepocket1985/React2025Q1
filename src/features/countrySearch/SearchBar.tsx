import React, { useState } from 'react';
import FlagsPic from '@assets/flags.png';

import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm!.trim();
    setSearchTerm(trimmedSearchTerm);
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
        <button type="submit" data-testid="serachSubmit">
          {'search'}
        </button>
      </form>
    </>
  );
};
