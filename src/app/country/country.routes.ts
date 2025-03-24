import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layout/country-layout/country-layout.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';

export const routes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryComponent
      },
      {
        path: 'by-region',
        component: ByRegionComponent
      },
      {
        path: 'by/:country',
        loadComponent: () => import('./pages/country-page/country-page.component').then(m => m.CountryPageComponent)
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  },
];
