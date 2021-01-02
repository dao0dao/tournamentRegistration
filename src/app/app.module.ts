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
import { PipesModule } from './pipes/pipes.module'
import { SharedModule } from './sharedModules/shared.module';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';


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
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    PipesModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
