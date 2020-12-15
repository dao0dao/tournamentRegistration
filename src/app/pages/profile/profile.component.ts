import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProfileService } from 'src/app/services/profile.service'
import { User } from 'src/interface/interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = undefined

  constructor(private profileService: ProfileService, private autService: AuthorizationService, public router: Router) { }

  ngOnInit() {
      this.profileService.getUserData(this.autService.token).subscribe(
        (res) => {
          this.profileService.getUser(res.users[0].localId).subscribe(
            (res) => {
              if (res) {
                this.user = res
              } else {
                this.router.navigate(['/profile/update'], { fragment: 'newUser' })
              }
            }
          )
        },
      )
    }
}
