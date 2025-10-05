export const COUNTRIES = ["UK", "Ireland", "US", "Other"] as const;
export type Country = (typeof COUNTRIES)[number];

export const MIN_AGE_BY_COUNTRY: Record<Country, number> = {
  UK: 25,
  Ireland: 25,
  US: 21,
  Other: 18,
};

export interface User {
  readonly id: string;
  country: Country;
  firstName: string;
  lastName: string;
  age: number;
}

export type NewUser = Omit<User, "id">;
