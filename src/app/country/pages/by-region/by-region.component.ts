import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/by-region.interfaces';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { TopRegionComponent } from "../../components/top-region/top-region.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-region',
  imports: [TableListComponent, TopRegionComponent],
  templateUrl: './by-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionComponent {

  regionList = signal('')
  contryService = inject(CountryService)
  preregions = signal<Region | null>(null)

  // regionEffect = effect(()=>{
  //   if(this.preregions() === null) return
  //   this.contryService.searchByRegion(this.preregions()!)
  // })
  regionResource = rxResource({
    request: () => ({ region: this.preregions() }),
    loader: ({ request }) => {
      if(!request.region) return of([])

      return this.contryService.searchByRegion(request.region)
    }
  })
}
