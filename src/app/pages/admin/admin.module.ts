import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { PlayersComponent } from './subpages/players/players.component';

import { SharedModule } from 'src/app/sharedModules/shared.module'
import { PipesModule } from 'src/app/pipes/pipes.module'


@NgModule({
    declarations: [
        AdminComponent,
        PlayersComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                    { path: '', redirectTo: '/admin/register', pathMatch: 'full' },
                    { path: 'register', component: PlayersComponent }
                ]
            }
        ])
    ]
})
export class AdminModule { }
