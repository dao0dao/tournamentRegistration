import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Player } from 'src/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  getPlayers(): Observable<Player[]> {
    return this.http.get(`${environment.fbUrlDatabase}tournament/players.json`).pipe(
      map((res: { [key: string]: Player }) => {
        return Object.keys(res).map(
          key => {
            return res[key]
          }
        )
      })
    )
  }

  constructor(private http: HttpClient) { }
}
