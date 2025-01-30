import { Component, ReactNode } from 'react';

import errorImg from './error.gif';
import styles from './ErrorMessage.module.css';

class ErrorMessage extends Component<{ errorMsg: string }> {
  render(): ReactNode {
    return (
      <>
        <img className={styles.errorImg} src={errorImg} alt="Error" />
        <p className={styles.errorInfo}>{this.props.errorMsg}</p>
      </>
    );
  }
}

export default ErrorMessage;
