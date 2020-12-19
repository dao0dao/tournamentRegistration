import { Injectable } from '@angular/core';

import { Token } from 'src/interface/interface';
import * as moment from 'moment'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
      localStorage.removeItem('idToken')
      localStorage.removeItem('expiresIn')
    }
  }

  private setUid(uid: string | null) {
    if (uid) {
      localStorage.setItem('uid', uid)
    } else {
      localStorage.removeItem('uid')
    }
  }

  get token(): string {
    const expiresIn = localStorage.getItem('expiresIn')
    let time = moment(expiresIn).format('YYYY/MM/DD HH:mm').toString()
    let now = moment(new Date()).format('YYYY/MM/DD HH:mm').toString()
    if (now > time) {
      this.logout()
      return null
    } else {
      return localStorage.getItem('idToken')
    }
  }

  get uid(): string {
    let uid = localStorage.getItem('uid')
    if (uid) { return uid } else { return null }
  }

  login(token: Token) {
    this.setToken(token)
    this.router.navigate(['/profile'])
  }

  loginAdmin(token: Token) {
    this.setToken(token)
    this.setUid(environment.adminUid)
    this.router.navigate(['/admin'])
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

  isAuth(): boolean {
    return !!this.token
  }

  constructor(private router: Router) { }
}
