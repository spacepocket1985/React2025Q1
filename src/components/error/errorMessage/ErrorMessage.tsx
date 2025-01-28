import errorImg from './error.gif';
import styles from './ErrorMessage.module.css';

export const ErrorMessage: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
  return (
    <>
      <img className={styles.errorImg} src={errorImg} alt="Error" />
      <p className={styles.errorInfo}>{errorMsg}</p>
    </>
  );
};
