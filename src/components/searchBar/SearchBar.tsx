import { useState } from 'react';

import { ErrorButton } from '../error/errorButton/ErrorButton';

import {
  getSearchTermFromLS,
  setSearchTermToLS,
} from '../../utils/localStorageActions';

import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(getSearchTermFromLS());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchTermToLS(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <>
      <img className={styles.searchBarPic} src={HeaderPic} alt="header pic" />
      <div className={styles.searchBarWrapper}>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button onClick={handleSubmit}>search</button>
        <ErrorButton />
      </div>
    </>
  );
};
