import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptService } from 'src/app/services/authIntercept.service';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/app/components/matDirectives/matDirectives';
import { MatRadioModule } from '@angular/material/radio';

import { GridComponent } from 'src/app/components/grid/grid.component'

const INTERCEPT_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptService,
    multi: true
}

@NgModule({
    declarations: [
        GridComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatRadioModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatRadioModule,
        GridComponent,
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: CustomMatPaginatorIntl
        },
        INTERCEPT_PROVIDER
    ]
})

export class SharedModule { }