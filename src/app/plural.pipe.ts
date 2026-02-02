import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(number: number, singular: string, plural: string): string {
    return number === 1 ? singular : plural;
  }
}
