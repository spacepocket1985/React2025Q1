import { Component, ReactNode } from 'react';
import { FuturamaApi } from './components/service/futuramaAPI';
import SearchBar from './components/searchBar/SearchBar';
import CardList from './components/cards/cardsList/CardList';

import { EmptyPropsType, AppState, ApiResponse } from './types';
import './App.css';

class App extends Component<EmptyPropsType, AppState> {
  constructor(props: EmptyPropsType) {
    super(props);
    this.state = {
      charactersList: [],
      error: null,
      isLoading: true,
    };
  }
  futuramaApi = new FuturamaApi();

  componentDidMount(): void {
    this.onRequest();
  }

  onRequest = (query?: string, size?: string, page?: string): void => {
    this.setState({ isLoading: true });
    this.futuramaApi
      .getCharacters(query, size, page)
      .then(this.onCharactersListLoaded)
      .catch(this.onError);
  };

  onCharactersListLoaded = (response: ApiResponse): void => {
    this.setState({
      charactersList: response.items.map((char) => char),
      isLoading: false,
      error: null,
    });
  };

  onError = (error: Error): void => {
    this.setState({
      isLoading: false,
      error: error.message,
    });
  };

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
