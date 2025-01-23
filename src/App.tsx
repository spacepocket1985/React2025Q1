import { Component, ReactNode } from 'react';
import './App.css';
import { EmptyPropsType, EmptyStateType } from './types';
import SearchBar from './components/searchBar/SearchBar';
import CardList from './components/cards/cardsList/CardList';

class App extends Component<EmptyPropsType, EmptyStateType> {
  render(): ReactNode {
    return (
      <>
        <SearchBar />
        <CardList />
      </>
    );
  }
}

export default App;
