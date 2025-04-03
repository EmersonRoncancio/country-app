import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountryMapperType } from '../../interfaces/country-mapper.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'table-list',
  imports: [DecimalPipe,RouterLink],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {

  countryList = input.required<CountryMapperType[]>()
  loading = input.required<boolean>()
  isError = input.required<string | unknown>()



}
