import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlES extends MatPaginatorIntl {
  itemsPerPageLabel = 'Elementos por página';
  nextPageLabel     = 'Siguiente';
  previousPageLabel = 'Anterior';
  firstPageLabel = "Primera";
  lastPageLabel = "Última";
  
  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };

}
