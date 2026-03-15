import { Component, input } from '@angular/core';
import { PluralPipe } from '../plural.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-countdown-unit',
  templateUrl: './countdown-unit.component.html',
  imports: [PluralPipe, DecimalPipe],
})
export class CountdownUnitComponent {
  public readonly value = input.required<number>();
  public readonly unit = input.required<{ singular: string; plural: string }>();
  public readonly leftPad = input(false);
}
