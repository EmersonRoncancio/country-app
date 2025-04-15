import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/by-region.interfaces';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { TopRegionComponent } from "../../components/top-region/top-region.component";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


const validateRegion = (region: string) => {
  region = region.charAt(0).toUpperCase() + region.slice(1).toLowerCase()

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  return regions.includes(region) ? region : 'Americas'
}

@Component({
  selector: 'by-region',
  imports: [TableListComponent, TopRegionComponent],
  templateUrl: './by-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionComponent {

  regionList = signal('')
  contryService = inject(CountryService)
  router = inject(Router)

  queryRegion = toSignal(
    inject(ActivatedRoute).queryParams.pipe(
      map(params => params['region'] || ''))
    )

  preregions = linkedSignal<Region | null>(() => validateRegion(this.queryRegion()) as Region)

  regionResource = rxResource({
    request: () => ({ region: this.preregions() }),
    loader: ({ request }) => {
      if(!request.region) return of([])

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      })

      return this.contryService.searchByRegion(request.region)
    }
  })
}
