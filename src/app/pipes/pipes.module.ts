import { NgModule } from '@angular/core';
import { StatusPipe } from './status.pipe';
import { SortUsersPipe } from './sort-users.pipe';

@NgModule({
    declarations: [StatusPipe, SortUsersPipe],
    exports: [StatusPipe, SortUsersPipe ]
})

export class PipesModule { }