import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountryMapperType } from '../../interfaces/country-mapper.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'table-list',
  imports: [DecimalPipe],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {

  countryList = input.required<CountryMapperType[]>()



}
