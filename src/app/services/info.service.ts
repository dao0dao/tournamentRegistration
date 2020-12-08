import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Info {
  isOpen: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  info$ = new Subject<Info>()

  toggler(isOpen: boolean, message: string) {
    this.info$.next({ isOpen, message })
  }

  constructor() { }
}
