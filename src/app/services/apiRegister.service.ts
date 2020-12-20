import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailVerify, FbErrors, FbRegister, FbResEmailVer, SignUp } from 'src/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRegisterService {

  sendEmailVerify(body: SignUp): Observable<FbResEmailVer | FbErrors> {
    let email: EmailVerify = {
      requestType: 'VERIFY_EMAIL',
      idToken: body.idToken,
    }
    return this.http.post<FbResEmailVer | FbErrors>(`${environment.fbUrlSendEmailVerify}${environment.apiKey}`, email, { headers: { 'X-Firebase-Locale': 'pl' } })
  }

  register(newUser: FbRegister): Observable<SignUp | FbErrors> {
    return this.http.post<SignUp | FbErrors>(`${environment.fbUrlSignUp}${environment.apiKey}`, newUser)
  }

  constructor(private http: HttpClient) { }
}
