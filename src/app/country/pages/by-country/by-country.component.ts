import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country',
  imports: [InputSearchComponent, TableListComponent],
  templateUrl: './by-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent {

  countryService = inject(CountryService)
  placeholderSignal = signal<string>('Buscar por país');
  countryList = signal('')

  // conutryResource = rxResource({
  //   request: () => ({ country: this.countryList() }),
  //   loader: ({ request }) => {
  //     if(!request.country) return of([])

  //     return this.countryService.searchByCountry(request.country)
  //   }
  // })

  conutryResource = resource({
    request: () => ({ country: this.countryList() }),
    loader: async ({ request }) => {
      if(!request.country) return []

      return await firstValueFrom(this.countryService.searchByCountry(request.country))
    }
  })
 }
