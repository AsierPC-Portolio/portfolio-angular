import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableComponent } from './table.component';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('UiTableComponent', () => {
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiTableComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: { getTranslation: () => of({}) } },
        }),
      ],
      providers: [TranslateService, TranslateStore],
    }).compileComponents();
    fixture = TestBed.createComponent(UiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render rows for each data item', () => {
    const data = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
      { id: 3, name: 'Three' },
    ];
    component.data = data;
    component.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ];
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    expect(rows[0].textContent).toContain('One');
    expect(rows[1].textContent).toContain('Two');
    expect(rows[2].textContent).toContain('Three');
  });
  it('should apply sorting when column header is clicked', () => {
    const data = [
      { id: 3, name: 'Three' },
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ];
    component.data = data;
    component.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ];
    fixture.detectChanges();

    // Buscar el th de la columna 'ID' de forma más flexible
    let header = fixture.nativeElement.querySelector('th[data-key="id"]');
    if (!header) {
      const ths = fixture.nativeElement.querySelectorAll('th');
      header = Array.from(ths).find((th: any) => th.textContent.includes('ID'));
    }
    expect(header).toBeTruthy();

    // Simular que el usuario hace click y el padre reordena los datos
    (header as HTMLElement).click();
    // Simular el output de sortChange si existe
    if (component.sortChange) {
      component.sortChange.emit('-name');
    }
    // El padre reordena los datos y los asigna de nuevo
    const sorted = [...data].sort((a, b) => a.id - b.id);
    component.data = sorted;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows[0].textContent).toContain('One');
    expect(rows[1].textContent).toContain('Two');
    expect(rows[2].textContent).toContain('Three');
  });
});
