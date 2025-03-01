import errorImg from './error.gif';
import Image from 'next/image';
import styles from './ErrorMessage.module.css';

export const ErrorMessage: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
  return (
    <>
      <Image
        className={styles.errorImg}
        src={errorImg}
        alt="Error"
        width={250}
        height={150}
      />
      <p className={styles.errorInfo}>{errorMsg}</p>
    </>
  );
};
