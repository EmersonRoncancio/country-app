import { CountryMapperType } from "../interfaces/country-mapper.interface";
import { CapitalResponse } from "../interfaces/country.interface";

export class CountryMapper{

  static mapCountry(data: CapitalResponse[]): CountryMapperType[] {
    return data.map((country) => {
      return {
        code: country.cca2,
        name: country.translations["spa"].common ?? country.name.common,
        capital: country.capital,
        area: country.area,
        population: country.population,
        flag: country.flag,
        flags: country.flags,
      }
    })
  }
}
