import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { CountryMapperType } from '../../interfaces/country-mapper.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'by-capital-page',
  imports: [InputSearchComponent, TableListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  placeholderSignal = signal<string>('Buscar por capital');
  countryService = inject(CountryService)
  loading = signal<boolean>(false)
  isError = signal<string | null>(null)
  countryList = signal<CountryMapperType[]>([])

  outputCapital( capital: string ) {
    if(this.loading()) return

    this.loading.set(true)
    this.isError.set(null)

    this.countryService.searchByCapital(capital)
      .subscribe({
        next: (response) => {
          this.countryList.set(response)
          this.loading.set(false)
        },
        error: (error) => {
          console.log(error)
          this.loading.set(false)
          this.countryList.set([])
          this.isError.set(error)
        },
      })

  }
}
