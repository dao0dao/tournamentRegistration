import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResPost, FbResUserData, User } from 'src/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  getUserData(idToken: string): Observable<FbResUserData> {
    return this.http.post<FbResUserData>(`${environment.fbUrlGetUserData}${environment.apiKey}`, { 'idToken': idToken })
  }

  getRegisteredUser(): Observable<User[] | undefined> {
    return this.http.get(`${environment.fbUrlDatabase}tournament/users.json`).pipe(
      map(
        (res: { [key: string]: User }) => {
          if (res) {
            return Object.keys(res).map(
              key => {
                if (res[key].status !== 'unregistered') {
                  let user: User
                  return user = res[key]
                }
              }
            )
          }
        }
      )
    )
  }

  getUser(localId: string): Observable<User | undefined> {
    let user: User
    return this.http.get(`${environment.fbUrlDatabase}tournament/users.json`).pipe(
      map((res: { [key: string]: User }) => {
        if (res) {
          Object.keys(res).map(
            key => {
              res[key].localId === localId ? user = res[key] : null
            }
          )
        }
        return user
      })
    )

  }

  postUser(user: User): Observable<any> {
    let newUser: User = Object.assign({}, user)
    return this.http.post<FbResPost>(`${environment.fbUrlDatabase}tournament/users.json`, newUser).pipe(
      map(res => {
        newUser.id = res.name
        return this.patch(newUser).subscribe()
      })
    )
  }

  patch(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.fbUrlDatabase}tournament/users/${user.id}.json`, user)
  }

  deleteUser(user: User, idToken: string): Observable<any> {
    return this.http.delete(`${environment.fbUrlDatabase}tournament/users/${user.id}.json`).pipe(
      map(() => {
        this.http.post<any>(`${environment.fbUrlDeleteUser}${environment.apiKey}`, { 'idToken': idToken }).subscribe()
      })
    )
  }



  constructor(private http: HttpClient) { }
}
