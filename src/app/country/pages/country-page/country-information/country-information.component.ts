import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountryMapperType } from '../../../interfaces/country-mapper.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {

  country = input.required<CountryMapperType>()

 }
