import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";

@Component({
  selector: 'by-country',
  imports: [InputSearchComponent, TableListComponent],
  templateUrl: './by-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent {

  placeholderSignal = signal<string>('Buscar por país');

  outputCapital( capital: string ) {
    console.log(capital);
  }
 }
