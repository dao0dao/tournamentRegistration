import { Pipe, PipeTransform } from '@angular/core';

type Status = 'registered' | 'pending' | 'unregistered'

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: Status): string {
    let result: string
    switch (value) {
      case "pending":
        result = 'oczekuje potwierdzenia'
        break;
      case "unregistered":
        result = 'nie zarejestrowany'
        break;
      case "registered":
        result = 'zarejestrowany'
        break;
      default:
        result = 'brak danych'
        break;
    }
    return result;
  }

}
