import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contestant, FbResPost, Player, TournamentResult } from 'src/interface/interface';
import * as moment from 'moment'

interface Tournament {
  id: string
  active: boolean
  contestants: Player[]
}

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  protected tournament: Tournament
  protected tournamentId: string

  get tournamentStatus(): Tournament | undefined {
    return this.tournament
  }

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

  isTournament(): Observable<Tournament | undefined> {
    return this.http.get(`${environment.fbUrlDatabase}tournament/isActive.json`).pipe(
      map(
        (res: { [key: string]: Tournament }) => {
          if (res) {
            Object.keys(res).map(key => {
              this.tournament = res[key]
            })
          }
          return this.tournament
        }
      )
    )
  }

  startTournament(contestants: Player[]): Observable<any | Tournament> {
    if (this.tournamentStatus === undefined) {
      let newTournament: Tournament = {
        id: '',
        active: true,
        contestants
      }
      return this.http.post<FbResPost>(`${environment.fbUrlDatabase}tournament/isActive.json`, newTournament).pipe(
        map(res => {
          this.tournament = {
            id: res.name,
            active: true,
            contestants
          }
          this.http.patch<Tournament>(`${environment.fbUrlDatabase}tournament/isActive/${this.tournament.id}.json`, this.tournament).subscribe()
        })
      )
    } else {
      this.tournament.active = true,
        this.tournament.contestants = contestants
      return this.http.patch<Tournament>(`${environment.fbUrlDatabase}tournament/isActive/${this.tournament.id}.json`, this.tournament)
    }
  }

  stopTournament(players: Player[]): Observable<Subscription> {
    let contestants: Contestant[] = []
    players.map(user => {
      const { firstName, lastName, points } = user
      let contestant: Contestant = { firstName, lastName, points }
      contestants.push(contestant)
    })
    let tournamentResult: TournamentResult = {
      date: moment(new Date()).format('YYYY-MM-DD HH:mm').toString(),
      contestants 
    }
    this.tournament.active = false
    this.tournament.contestants = null
    return this.http.patch<any>(`${environment.fbUrlDatabase}tournament/isActive/${this.tournament.id}.json`, this.tournament).pipe(
      map(
        () => {
          this.http.delete(`${environment.fbUrlDatabase}tournament/players.json`).subscribe()
          return this.http.post(`${environment.fbUrlDatabase}tournament/results.json`, tournamentResult).subscribe()
        }
      )
    )
  }

  updateLadder(contestants: Player[]): Observable<Tournament> {
    this.tournament.contestants = contestants
    return this.http.patch<Tournament>(`${environment.fbUrlDatabase}tournament/isActive/${this.tournament.id}.json`, { 'contestants': contestants })
  }

  constructor(private http: HttpClient) { }
}
