import { Component, input } from '@angular/core';
import { PluralPipe } from '../plural.pipe';

@Component({
  selector: 'app-countdown-unit',
  templateUrl: './countdown-unit.component.html',
  imports: [PluralPipe],
})
export class CountdownUnitComponent {
  public readonly value = input.required<number>();
  public readonly unit = input.required<{ singular: string; plural: string }>();
}
