import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';

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

  outputCapital( capital: string ) {
   this.countryService.searchByCountry(capital)
    .subscribe((response) => {
      console.log(response)
    })
  }
 }
