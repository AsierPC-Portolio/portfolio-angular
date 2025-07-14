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
import { SpinnerComponent } from '../spinner/spinner.component';

export interface UiTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerComponent],
  templateUrl: './table.component.html',
})
export class UiTableComponent {
  get sortKey(): string {
    const s = this.sort || '';
    return s.startsWith('-') ? s.substring(1) : s;
  }
  get sortDir(): string {
    const s = this.sort || '';
    return s.startsWith('-') ? 'desc' : 'asc';
  }
  @Input() columns: UiTableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() page = 0;
  @Input() size = 10;
  @Input() total = 0;
  @Input() sort: string = '';

  @ContentChild('rowActions', { static: false })
  rowActionsTemplate: TemplateRef<any> | undefined | null = null;

  @Output() sortChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  onSort(col: UiTableColumn) {
    if (!col.sortable) return;
    const current = this.sortKey;
    const dir = this.sortDir;
    const newDir = current === col.key && dir === 'asc' ? 'desc' : 'asc';
    const backendSort = newDir === 'desc' ? `-${col.key}` : col.key;
    this.sortChange.emit(backendSort);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  getTo(): number {
    return Math.min((this.page + 1) * this.size, this.total);
  }
}
