import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal} from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  countryService = inject(CountryService)
  country = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['country'])
    )
  )

 countryResource = rxResource({
    request: () => ({ country: this.country() }),
    loader: ({ request }) => {
      if(!request.country) return of()

      return this.countryService.searchByAlphaCode(request.country)
    }
 })

 }
