import { Component, ReactNode } from 'react';

import { EmptyPropsType } from '../../../types';

type ErrorButtonStateType = {
  hasError: boolean;
};

export class ErrorButton extends Component<
  EmptyPropsType,
  ErrorButtonStateType
> {
  state: ErrorButtonStateType = {
    hasError: false,
  };
  onClickError = (): void => {
    this.setState({ hasError: true });
  };
  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('Ooppps! We have some problems!');
    }
    return (
      <button className="errorButton" onClick={this.onClickError}>
        Get an Error
      </button>
    );
  }
}
