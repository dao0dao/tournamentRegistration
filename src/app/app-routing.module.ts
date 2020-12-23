import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { IsLoggedGuard } from './guards/isLogged.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotAdminGuard } from './guards/not-admin.guard'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [IsLoggedGuard, NotAdminGuard] },
  { path: 'profile/update', component: UpdateProfileComponent, canActivate: [IsLoggedGuard, NotAdminGuard] },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', canActivate: [AdminGuard, IsLoggedGuard] },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
