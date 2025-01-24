import { Component, ReactNode } from 'react';
import { EmptyPropsType, EmptyStateType } from '../../types';

import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';

class SearchBar extends Component<EmptyPropsType, EmptyStateType> {
  render(): ReactNode {
    return (
      <>
        <img className={styles.searchBarPic} src={HeaderPic} alt="header pic" />
        <div className={styles.searchBarWrapper}>
          <input type="text" />
          <button>search</button>
        </div>
      </>
    );
  }
}

export default SearchBar;
