import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbErrors, FbLogIn, FbResEmailVer, FbResetPassword, FbResLogin, FbResUserData } from 'src/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  login(login: FbLogIn): Observable<FbResLogin | FbErrors> {
    return this.http.post<FbResLogin | FbErrors>(`${environment.fbUrlLogIn}${environment.apiKey}`, login)
  }

  sendEmailVerified(idToken: { [key: string]: string }): Observable<FbResUserData | FbErrors> {
    return this.http.post<FbResUserData | FbErrors>(`${environment.fbUrlGetUserData}${environment.apiKey}`, idToken)
  }

  resetPassword(body: FbResetPassword): Observable<FbResEmailVer | FbErrors> {
    return this.http.post<FbResEmailVer | FbErrors>(`${environment.fbUrlSendEmailVerify}${environment.apiKey}`, body, { headers: { 'X-Firebase-Locale': 'pl' } })
  }

  constructor(private http: HttpClient) { }
}
