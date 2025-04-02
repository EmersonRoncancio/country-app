import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-region',
  imports: [TableListComponent],
  templateUrl: './by-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionComponent {

  regionList = signal('')
  contryService = inject(CountryService)

  getRegionList(region: string = 'americas') {
    this.contryService.searchByRegion(region)
      .subscribe((response) => {
        console.log(response)
      })
  }
}
