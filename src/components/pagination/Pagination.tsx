import React from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { setPage } from '@store/slices/appDataSlice';

import styles from './Pagination.module.css';

export const Pagination: React.FC = () => {
  const { page: currentPage, pages: totalPages } = useAppSelector(
    (state) => state.appData
  );
  const dispatch = useAppDispatch();
  const onPageChange = (pageNum: number) => dispatch(setPage(pageNum));
  const pages = [...Array(totalPages)].map((_, index) => index + 1);

  const siblingsCount = 2;
  let startPage, endPage;

  if (totalPages <= 5 + siblingsCount * 2) {
    startPage = 1;
    endPage = totalPages;
  } else {
    startPage = Math.max(currentPage - siblingsCount, 1);
    endPage = Math.min(currentPage + siblingsCount, totalPages);

    if (currentPage - siblingsCount <= 1) {
      endPage = 5;
    }

    if (currentPage + siblingsCount >= totalPages) {
      startPage = totalPages - 4;
    }
  }

  return (
    <div className={styles.paginationWrapper}>
      {currentPage > 1 && (
        <button
          className={styles.arrowBtn}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {'Prev'}
        </button>
      )}
      {startPage > 1 && <button onClick={() => onPageChange(1)}>1</button>}
      {startPage > 2 && <span className={styles.divider}>...</span>}

      {pages.slice(startPage - 1, endPage).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page ? styles.currentBtn : styles.paginationBtn
          }
        >
          {page}
        </button>
      ))}

      {endPage < totalPages - 1 && <span className={styles.divider}>...</span>}
      {endPage < totalPages && (
        <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
      )}
      {currentPage < totalPages && (
        <button
          className={styles.arrowBtn}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {'Next'}
        </button>
      )}
    </div>
  );
};
