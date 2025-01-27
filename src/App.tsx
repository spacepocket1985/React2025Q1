import { Component, ReactNode } from 'react';

import SearchBar from './components/searchBar/SearchBar';
import CardList from './components/cards/cardsList/CardList';
import ErrorMessage from './components/error/errorMessage/ErrorMessage';
import Spinner from './components/spinner/Spinner';

import { FuturamaApi } from './components/service/futuramaAPI';
import { EmptyPropsType, AppState, ApiResponse } from './types';
import { getSearchTermFromLS } from './utils/localStorageActions';

import './App.css';

class App extends Component<EmptyPropsType, AppState> {
  state = {
    charactersList: [],
    error: null,
    isLoading: true,
  };

  futuramaApi = new FuturamaApi();

  componentDidMount(): void {
    const searchTerm = getSearchTermFromLS();
    this.onRequest(searchTerm);
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
    const { charactersList, isLoading, error } = this.state;

    return (
      <>
        <SearchBar onSearch={this.onRequest} />
        {error && <ErrorMessage errorMsg={error} />}
        {!error && isLoading && <Spinner />}
        {!error && !isLoading && <CardList items={charactersList} />}
      </>
    );
  }
}

export default App;
