import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'input-search',
  imports: [],
  templateUrl: './input-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent {
  capitalSignal = output<string>()
  placeholder = input.required<string>()

  onChanceCapital(capital: string) {
    this.capitalSignal.emit(capital)
  }

}
