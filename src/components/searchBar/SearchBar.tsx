import { Component, ReactNode } from 'react';

import { ErrorButton } from '../error/errorButton/ErrorButton';

import { SearchBarState } from '../../types';
import {
  getSearchTermFromLS,
  setSearchTermToLS,
} from '../../utils/localStorageActions';

import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    searchTerm: getSearchTermFromLS(),
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    setSearchTermToLS(trimmedSearchTerm);
    this.props.onSearch(trimmedSearchTerm);
  };

  render(): ReactNode {
    const { searchTerm } = this.state;
    return (
      <>
        <img className={styles.searchBarPic} src={HeaderPic} alt="header pic" />
        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSubmit}>search</button>
          <ErrorButton />
        </div>
      </>
    );
  }
}

export default SearchBar;
