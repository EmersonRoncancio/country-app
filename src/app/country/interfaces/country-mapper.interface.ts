import { Flags, Translation } from "./country.interface";

export interface CountryMapperType {
  code: string;
  name: string;
  capital: string[];
  area: number;
  flag: string;
  population: number;
  flags: Flags;
}
