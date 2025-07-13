import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface UiTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './table.component.html',
})
export class UiTableComponent {
  @Input() columns: UiTableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() page = 0;
  @Input() size = 10;
  @Input() total = 0;
  @Input() sort: string = '';

  @ContentChild('rowActions', { static: false })
  rowActionsTemplate?: TemplateRef<any>;

  @Output() sortChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  onSort(col: UiTableColumn) {
    if (!col.sortable) return;
    const [current, dir] = this.sort.split(',');
    const newDir = current === col.key && dir === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit(`${col.key},${newDir}`);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  getTo(): number {
    return Math.min((this.page + 1) * this.size, this.total);
  }
}
