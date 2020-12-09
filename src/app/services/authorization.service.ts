import { Injectable } from '@angular/core';

import { Token } from 'src/interface/interface';
import * as moment from 'moment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private setToken(token: Token | null) {
    if (token) {
      let expiresIn = moment(new Date()).add(token.expiresIn, 's').toString()
      localStorage.setItem('idToken', `${token.idToken}`)
      localStorage.setItem('expiresIn', expiresIn)
    } else {
      localStorage.clear()
    }
  }

  get token(): string {
    const expiresIn = localStorage.getItem('expiresIn')
    if (new Date().toString() > expiresIn) {
      this.logout()
      return null
    } else {
      return localStorage.getItem('idToken')
    }
  }

  login(token: Token) {
    this.setToken(token)
    this.router.navigate(['/profile'])
  }

  logout() {
    this.setToken(null)
    this.router.navigate(['/'])
  }

  isAuth(): boolean {
    return !!this.token
  }

  constructor(private router: Router) { }
}
