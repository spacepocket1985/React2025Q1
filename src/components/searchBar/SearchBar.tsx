import { Component, ReactNode } from 'react';
import { EmptyPropsType, EmptyStateType } from '../../types';

class SearchBar extends Component<EmptyPropsType, EmptyStateType> {
  render(): ReactNode {
    return <h3>SearchBar</h3>;
  }
}

export default SearchBar;
