import { Component, OnInit, DoCheck } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [
    trigger('info', [
      transition('void => *', animate(200, style({ opacity: 1 }))),
      transition('* => void', animate(200, style({ opacity: 0 }))),
    ])
  ]
})
export class InfoComponent implements OnInit, DoCheck {

  subscription: Subscription
  isOpen: boolean = false
  message: string = null

  constructor(private infoService: InfoService) { }

  ngOnInit() {
    this.subscription = this.infoService.info$.subscribe(
      (res) => {
        this.isOpen = res.isOpen;
        this.message = res.message;
      }
    )
  }
  ngDoCheck() {
    this.isOpen === true && setTimeout(() => {
      this.infoService.toggler(false, '')
    }, 2500);
  }
}
