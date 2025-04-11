import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'input-search',
  imports: [],
  templateUrl: './input-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent {
  capitalSignal = output<string>()
  placeholder = input.required<string>()
  inputValue = signal<string>('')

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue()

    const timeout = setTimeout(()=>{
      this.capitalSignal.emit(value)
    }, 500)

    onCleanup(()=>{
      clearTimeout(timeout)
    })
  })

  onChanceCapital(capital: string) {
    this.capitalSignal.emit(capital)
  }

}
