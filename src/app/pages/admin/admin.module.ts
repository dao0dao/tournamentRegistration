import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { PlayersRegisterComponent } from './subpages/playersRegister/playersRegister.component';

import { SharedModule } from 'src/app/sharedModules/shared.module'
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PlayersComponent } from './subpages/players/players.component'


@NgModule({
    declarations: [
        AdminComponent,
        PlayersRegisterComponent,
        PlayersComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                    { path: '', redirectTo: '/admin/players_register', pathMatch: 'full' },
                    { path: 'players_register', component: PlayersRegisterComponent },
                    { path: 'players', component: PlayersComponent }
                ]
            }
        ])
    ]
})
export class AdminModule { }
