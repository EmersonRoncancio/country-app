import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";

@Component({
  selector: 'by-region',
  imports: [TableListComponent],
  templateUrl: './by-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionComponent {


}
