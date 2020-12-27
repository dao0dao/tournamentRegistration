import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/interface/interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: Player[]
  active: boolean

  startTournament() {
    this.playersService.startTournament().subscribe(
      () => {
        this.active = true
      }
    )
  }

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.playersService.isTournament().subscribe(
      (res: Array<{ [key: string]: boolean }>) => {
        this.active = res.reduce(el => { return el }).active
      }
    )
    this.playersService.getContestants().subscribe(
      (res) => { this.players = res }
    )
  }
}