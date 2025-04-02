import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CapitalResponse } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { CountryMapperType } from '../interfaces/country-mapper.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital(capital: string): Observable<CountryMapperType[]> {

    capital = capital.trim().toLowerCase();

    return this.http.get<CapitalResponse[]>(`https://restcountries.com/v3.1/capital/${capital}`)
      .pipe(
        map((response) => {
          return CountryMapper.mapCountry(response)
        }),
        catchError((err) => {
          console.log(err)
          return throwError(() => new Error('Error en la petición'))
        })
    )
  }

  searchByRegion(region: string){
    region = region.trim().toLowerCase();

    return this.http.get(`https://restcountries.com/v3.1/region/${region}`)
      .pipe(
        map((response) => {
          console.log(response)
          return response
        })
      )
  }

  searchByCountry(country: string){
    country = country.trim().toLowerCase();

    return this.http.get<CapitalResponse[]>(`https://restcountries.com/v3.1/translation/${country}`)
      .pipe(
        map((response) => {
          console.log(response)
          return response
        },
        catchError((error) => {
          console.log(error)
          return throwError(() => new Error('Error en la petición'))
        })
      )
    )
  }
}
