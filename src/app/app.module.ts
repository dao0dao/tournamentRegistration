import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { ErrorComponent } from './pages/error/error.component'
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { AuthInterceptService } from './services/authIntercept.service';

import { AdminModule } from './pages/admin/admin.module'
import { PipesModule } from './pipes/pipes.module'
import { SharedModule } from './sharedModules/shared.module'


const INTERCEPT_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptService,
  multi: true
}

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    PipesModule
  ],
  providers: [INTERCEPT_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
