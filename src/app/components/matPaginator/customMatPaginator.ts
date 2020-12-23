import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator'

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    nextPageLabel: string = null;
    previousPageLabel: string = null;
    itemsPerPageLabel: string = 'Graczy na stronę';

    getRangeLabel = function (page: number, pageSize : number, length: number) {
        if (length === 0 || pageSize === 0) {
            return '0 z' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' z ' + length;
    }
}