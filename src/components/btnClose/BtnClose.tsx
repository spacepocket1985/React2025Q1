'use client';
import { useAppDispatch } from '@hooks/storeHooks';
import { cardClose } from '@store/slices/appDataSlice';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './BtnClose.module.css';
export const BtnClose = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleCloseDetails = () => {
    dispatch(cardClose());
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.delete('cardDetails');

    router.push(`/?${newParams.toString()}`);
  };
  return (
    <button
      data-testid="closeDetailsBtn"
      className={styles.btnClose}
      onClick={handleCloseDetails}
    >
      X
    </button>
  );
};
