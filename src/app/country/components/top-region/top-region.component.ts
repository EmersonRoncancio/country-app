import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Region } from '../../interfaces/by-region.interfaces';

@Component({
  selector: 'top-region',
  imports: [],
  templateUrl: './top-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRegionComponent {


  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectRegion = output<Region>()
  region = signal<Region | null>(null)

  selectedRegion(region: Region) {
    this.selectRegion.emit(region)
    this.region.set(region)
  }
}
