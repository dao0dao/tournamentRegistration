import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/interface/interface';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent implements OnInit {

  players: Player[]
  active: boolean

  constructor(private playersService : PlayersService) { }

  ngOnInit() {
    this.playersService.getContestants().subscribe(
      (res) => { this.players = res }
    )
  }

}
