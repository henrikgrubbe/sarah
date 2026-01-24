import { Component, input } from '@angular/core';

@Component({
  selector: 'app-countdown-unit',
  imports: [],
  templateUrl: './countdown-unit.component.html',
})
export class CountdownUnitComponent {
  public readonly value = input.required<number>();
  public readonly unit = input.required<string>();
}
