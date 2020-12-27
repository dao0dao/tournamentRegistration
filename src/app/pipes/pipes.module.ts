import { NgModule } from '@angular/core';
import { StatusPipe } from './status.pipe';
import { SortUsersPipe } from './sort-users.pipe';
import { ToNumberPipe } from './to-number.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { ShortLastPipe } from './short-last.pipe';

@NgModule({
    declarations: [
        StatusPipe,
        SortUsersPipe,
        ToNumberPipe,
        ShortNamePipe,
        ShortLastPipe
    ],
    exports: [
        StatusPipe,
        SortUsersPipe,
        ToNumberPipe,
        ShortNamePipe,
        ShortLastPipe
    ]
})

export class PipesModule { }