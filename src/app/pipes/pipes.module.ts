import { NgModule } from '@angular/core';
import { StatusPipe } from './status.pipe';
import { SortUsersPipe } from './sort-users.pipe';
import { ToNumberPipe } from './to-number.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { ShortLastPipe } from './short-last.pipe';
import { PlacePipe } from './place.pipe';
import { ShortFullNamePipe } from './short-full-name.pipe';



@NgModule({
    declarations: [
        StatusPipe,
        SortUsersPipe,
        ToNumberPipe,
        ShortNamePipe,
        ShortLastPipe,
        PlacePipe,
        ShortFullNamePipe,

    ],
    exports: [
        StatusPipe,
        SortUsersPipe,
        ToNumberPipe,
        ShortNamePipe,
        ShortLastPipe,
        PlacePipe,
        ShortFullNamePipe,
    ]
})

export class PipesModule { }