import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal} from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  country = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['country'])
    )
  )

  outputCountry( country: string ) {
    console.log(country);
  }

 }
