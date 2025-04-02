import { Flags, Translation } from "./country.interface";

export interface CountryMapperType {
  name: string;
  capital: string[];
  area: number;
  flag: string;
  population: number;
  flags: Flags;
}
