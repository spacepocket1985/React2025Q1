type Translation = {
  official: string;
  common: string;
};

type Flags = {
  png: string;
  svg: string;
  alt?: string;
};

type Membership = {
  countryCode: string;
};

type RegionalBlock = {
  acronym: string;
  name: string;
  memberships?: Membership[];
};

type Currency = {
  name: string;
  symbol: string;
};

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, Translation>;
  };
  translations: {
    rus: {
      official: string;
    };
  };
  tld: string[];
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  capital: string;
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  flags: Flags;
  continents: string[];
  population: number;
  area: number;
  latlng: number[];
  timezones: string[];
  borders?: string[];
  region: string;
  subregion: string;
  regionalBlocs?: RegionalBlock[];
  altSpellings: string[];
};
