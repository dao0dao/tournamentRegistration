import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { ErrorComponent } from './pages/error/error.component'
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

import { AdminModule } from './pages/admin/admin.module'
import { SharedModule } from './sharedModules/shared.module';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { LadderComponent } from './pages/ladder/ladder.component';
import { ContestantsComponent } from './pages/contestants/contestants.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    InfoComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ErrorComponent,
    ScoreboardComponent,
    LadderComponent,
    ContestantsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
