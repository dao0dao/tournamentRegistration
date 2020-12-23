import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResPost, Player } from 'src/interface/interface';

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

  constructor(private http: HttpClient) { }
}
