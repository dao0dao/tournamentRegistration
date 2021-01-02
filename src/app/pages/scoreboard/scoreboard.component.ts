import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service'
import { TournamentResult } from 'src/interface/interface';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  animations: [
    trigger('content', [
      state('false', style({ 'max-height': 0 })),
      state('true', style({ 'max-height': '500px' })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ])
  ]
})
export class ScoreboardComponent implements OnInit {

  results: TournamentResult[]

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.getResults().subscribe(
      (res) => {
        this.results = res
        this.results.map((tour, i) => { tour.index = i })
        this.results.reverse()
        this.results.map(tour => {
          tour.expand = false
          tour.contestants.sort((p1, p2) => (p2.points - p1.points))
        })
      }
    )
  }

}
