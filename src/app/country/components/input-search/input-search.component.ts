import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'input-search',
  imports: [],
  templateUrl: './input-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent {
  capitalSignal = output<string>()
  placeholder = input.required<string>()
  initialValue = input<string>('')
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')



  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue()

    const timeout = setTimeout(()=>{
      this.capitalSignal.emit(value)

      console.log('capitalSignal', value)
    }, 500)

    console.log({value})
    onCleanup(()=>{
      clearTimeout(timeout)
    })
  })

  onChanceCapital(capital: string) {
    this.capitalSignal.emit(capital)
  }

}
