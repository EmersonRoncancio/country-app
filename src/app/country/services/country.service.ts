import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CapitalResponse } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { CountryMapperType } from '../interfaces/country-mapper.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private chancheCapital = new Map<string, CountryMapperType[]>();
  private changeCountry = new Map<string, CountryMapperType[]>();
  private changeRegion = new Map<string, CountryMapperType[]>();


  searchByCapital(capital: string): Observable<CountryMapperType[]> {

    if(this.chancheCapital.has(capital)){
      console.log('Ya existe en el cache');
      return of(this.chancheCapital.get(capital)!);
    }

    console.log('No existe en el cache');
    capital = capital.trim().toLowerCase();

    return this.http.get<CapitalResponse[]>(`https://restcountries.com/v3.1/capital/${capital}`)
      .pipe(
        map((response) => {
          return CountryMapper.mapCountry(response)
        }),
        tap((response) => {
          this.chancheCapital.set(capital, response)
        }),
        catchError((err) => {
          console.log(err)
          return throwError(() => new Error('Error en la petición'))
        })
    )
  }

  searchByRegion(region: string){
    region = region.trim().toLowerCase();

    if(this.changeRegion.has(region)){
      console.log('Ya existe en el cache');
      return of(this.changeRegion.get(region)!);
    }

    console.log('No existe en el cache');

    return this.http.get<CapitalResponse[]>(`https://restcountries.com/v3.1/region/${region}`)
      .pipe(
        map((response) => {
          return CountryMapper.mapCountry(response)
        }),
        tap((response) => {
          this.changeRegion.set(region, response)
        }
      ),
        catchError((error) => {
          console.log(error)
          return throwError(() => new Error('Error en la petición'))
        }
      )
    )
  }

  searchByCountry(country: string){
    country = country.trim().toLowerCase();

    if(this.changeCountry.has(country)){
      console.log('Ya existe en el cache');
      return of(this.changeCountry.get(country)!);
    }

    console.log('No existe en el cache');

    return this.http.get<CapitalResponse[]>(`https://restcountries.com/v3.1/name/${country}`)
      .pipe(
        map((response) => {
          console.log(response)
          return CountryMapper.mapCountry(response)
        }),
        tap((response) => {
          this.changeCountry.set(country, response)
        }),
        catchError((error) => {
          console.log(error)
          return throwError(() => new Error('Error en la petición'))
        })

    )
  }

  searchByAlphaCode(code: string){
    code = code.trim().toLowerCase();

    return this.http.get<CapitalResponse[]>(`https://restcountries.com/v3.1/alpha/${code}`)
      .pipe(
        map((response) => {
          console.log(response)
          return CountryMapper.mapCountry(response)
        }),
        map((data)=> data[0]),
        catchError((error) => {
          console.log(error)
          return throwError(() => new Error('Error en la petición'))
        })
      )
  }
}
