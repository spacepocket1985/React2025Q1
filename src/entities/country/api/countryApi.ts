import { Country } from '@entities/country/model/types';

const BaseUrl = 'https://restcountries.com/v3.1/all';

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(BaseUrl);
    if (!response.ok) throw new Error('Error! Problems loading data.');
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
