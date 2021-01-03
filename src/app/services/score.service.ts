import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TournamentResult } from 'src/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  getResults(): Observable<TournamentResult[]> {
    return this.http.get<TournamentResult[]>(`${environment.fbUrlDatabase}tournament/results.json`).pipe(
      map(
        (res) => {
          if(res){
            return Object.values(res)
          } else {
            return undefined
          }
        }
      )
    )
  }

  clearResult(): Observable<any>{
    return this.http.delete<any>(`${environment.fbUrlDatabase}tournament/results.json`)
  }

  constructor(private http: HttpClient) { }
}