import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";

@Component({
  selector: 'by-capital-page',
  imports: [InputSearchComponent, TableListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  placeholderSignal = signal<string>('Buscar por capital');

  outputCapital( capital: string ) {
    console.log(capital);
  }
}
