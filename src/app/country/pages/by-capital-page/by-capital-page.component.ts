import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { CountryMapperType } from '../../interfaces/country-mapper.interface';
import { DecimalPipe } from '@angular/common';
import { firstValueFrom, map, of } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-capital-page',
  imports: [InputSearchComponent, TableListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  placeholderSignal = signal<string>('Buscar por capital');
  countryService = inject(CountryService)
  queryCapital = toSignal(
    inject(ActivatedRoute).queryParams.pipe(
      map(params => params['capital'] || ''))
    )
  capital = linkedSignal<string>(() => this.queryCapital())
  router = inject(Router)


  CapitalResource = rxResource({
    request: () => ({capital: this.capital()}),
    loader: ({request}) => {
      if(!request.capital) return of([])

        this.router.navigate(['/country/by-capital'], {
          queryParams: {
            capital: request.capital
          }
        })

      return this.countryService.searchByCapital(request.capital)
    }
  })

  // CapitalResource = resource({
  //   request: () => ({capital: this.capital()}),
  //   loader: async({request}) => {
  //     if(!request.capital) return []

  //     return await firstValueFrom(this.countryService.searchByCapital(this.capital()))
  //   }
  // })


  // loading = signal<boolean>(false)
  // isError = signal<string | null>(null)
  // countryList = signal<CountryMapperType[]>([])

  // outputCapital( capital: string ) {
  //   if(this.loading()) return

  //   this.loading.set(true)
  //   this.isError.set(null)

  //   this.countryService.searchByCapital(capital)
  //     .subscribe({
  //       next: (response) => {
  //         this.countryList.set(response)
  //         this.loading.set(false)
  //       },
  //       error: (error) => {
  //         console.log(error)
  //         this.loading.set(false)
  //         this.countryList.set([])
  //         this.isError.set(error)
  //       },
  //     })
  // }
}
