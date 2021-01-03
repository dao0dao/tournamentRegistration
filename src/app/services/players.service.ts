import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResPost, Player, User } from 'src/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  registerPlayer(player: Player): Observable<any> {
    let newPlayer: Player = Object.assign({}, player)
    return this.http.post<FbResPost>(`${environment.fbUrlDatabase}tournament/players.json`, player).pipe(
      map(
        (res) => {
          newPlayer.id = res.name
          this.updatePlayer(newPlayer).subscribe()
        }
      )
    )
  }
  updatePlayer(player: Player): Observable<Player> {
    return this.http.patch<Player>(`${environment.fbUrlDatabase}tournament/players/${player.id}.json`, player)
  }

  unregister(user: User): Observable<any> {
    return this.getContestants().pipe(
      map((players) => {
        let player: Player
        players.map(el => { if (el.localId === user.localId) { player = el } })
        this.http.delete(`${environment.fbUrlDatabase}tournament/players/${player.id}.json`).subscribe()
      })
    )
  }

  getContestants(): Observable<Player[]> {
    let players: Player[] = []
    return this.http.get(`${environment.fbUrlDatabase}tournament/players.json`).pipe(
      map(
        (res: { [key: string]: Player }) => {
          if (res) {
            Object.keys(res).map(
              key => {
                players.push(res[key])
              }
            )
          }
          return players
        })
    )
  }

  constructor(private http: HttpClient) { }
}
