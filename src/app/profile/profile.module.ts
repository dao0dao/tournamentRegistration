import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserComponent } from './pages/user/user.component';




@NgModule({
  declarations: [ProfileComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ProfileComponent, children: [
          { path: '', redirectTo: '/profile/user', pathMatch: 'full' },
          { path: 'user', component: UserComponent }
        ]
      }
    ])
  ]
})
export class ProfileModule { }
