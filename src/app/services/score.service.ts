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
          return Object.values(res)
        }
      )
    )
  }

  constructor(private http: HttpClient) { }
}