import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, map, of } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country',
  imports: [InputSearchComponent, TableListComponent],
  templateUrl: './by-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent {

  countryService = inject(CountryService)
  placeholderSignal = signal<string>('Buscar por país');
  router = inject(Router)

  queryCountry = toSignal(
    inject(ActivatedRoute).queryParams.pipe(
      map(params => params['country'] || ''))
  )

  countryList = linkedSignal(() => this.queryCountry())

  conutryResource = resource({
    request: () => ({ country: this.countryList() }),
    loader: async ({ request }) => {
      if(!request.country) return []

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          country: request.country
        }
      })

      return await firstValueFrom(this.countryService.searchByCountry(request.country))
    }
  })
 }
