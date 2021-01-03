import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'place'
})
export class PlacePipe implements PipeTransform {

  transform(value: number,): number | string {
    let place: number | string
    if (value === 1) {
      place = 1
    } else if (value === 2) {
      place = 2
    } else if (value <= 4) {
      place = '3-4'
    } else if (value <= 8) {
      place = '5-8'
    } else {
      place = '9-16'
    }
    return place;
  }

}
