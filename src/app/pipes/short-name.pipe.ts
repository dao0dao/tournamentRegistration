import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(value: string): string {
    let shortName = `${value.slice(0, 1)}.`
    return shortName;
  }

}
