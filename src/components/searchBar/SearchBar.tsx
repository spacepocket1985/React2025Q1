'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { DefaultQuery } from '@service/futuramaAPI';

import HeaderPic from './headerPic.png';
import styles from './SearchBar.module.css';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useLocalStorage();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm!.trim();
    setSearchTerm(trimmedSearchTerm);
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('query', trimmedSearchTerm);

    router.push(`/?${newParams.toString()}`);
  };

  return (
    <>
      <Image
        className={styles.searchBarPic}
        src={HeaderPic.src}
        alt="header pic"
        width={420}
        height={162}
        priority
      />
      <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm || DefaultQuery}
          onChange={handleInputChange}
          data-testid="searchInput"
        />
        <button
          className={styles.searchBtn}
          type="submit"
          data-testid="serachSubmit"
        >
          search
        </button>
      </form>
    </>
  );
};
