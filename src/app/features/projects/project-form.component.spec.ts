import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProjectService } from '../../api';
import { of } from 'rxjs';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

class MockProjectService {
  createProject() { return of({}); }
  updateProject() { return of({}); }
}

describe('ProjectFormComponent', () => {
  it('should reset the form when open changes to true and project is null', () => {
    component.form.patchValue({ name: 'Test', countryCode: 'ES', startDate: '2024-01-01', endDate: '2024-12-31' });
    component.open = true;
    component.project = null;
    component.ngOnChanges({ open: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false } });
    expect(component.form.value).toEqual({ name: null, countryCode: null, startDate: null, endDate: null });
  });
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectFormComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: { getTranslation: () => of({}) } },
        }),
      ],
      providers: [
        { provide: ProjectService, useClass: MockProjectService },
        FormBuilder,
        TranslateService,
        TranslateStore,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should patch form values when project input changes', () => {
    const project = {
      id: 1,
      name: 'Test',
      countryCode: 'ES',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    };
    component.project = project;
    component.ngOnChanges({ project: { currentValue: project, previousValue: null, firstChange: true, isFirstChange: () => true } });
    expect(component.form.value.name).toBe('Test');
    expect(component.form.value.countryCode).toBe('ES');
    expect(component.form.value.startDate).toBe('2024-01-01');
    expect(component.form.value.endDate).toBe('2024-12-31');
  });
    it('should call createProject and emit saved/closed on submit (create)', () => {
    const createSpy = spyOn(TestBed.inject(ProjectService), 'createProject').and.returnValue(of({} as any));
    const savedSpy = spyOn(component.saved, 'emit');
    const closedSpy = spyOn(component.closed, 'emit');
    component.project = null;
    component.form.patchValue({
      name: 'Nuevo',
      countryCode: 'ES',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    });
    component.loading = false;
    component.submit();
    expect(createSpy).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(savedSpy).toHaveBeenCalled();
    expect(closedSpy).toHaveBeenCalled();
  });

  it('should reset the form after submit (create)', () => {
    const createSpy = spyOn(TestBed.inject(ProjectService), 'createProject').and.returnValue(of({} as any));
    component.project = null;
    component.form.patchValue({
      name: 'Nuevo',
      countryCode: 'ES',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    });
    component.loading = false;
    component.submit();
    expect(component.form.value).toEqual({ name: null, countryCode: null, startDate: null, endDate: null });
  });

  it('should call updateProject and emit saved/closed on submit (update)', () => {
    const updateSpy = spyOn(TestBed.inject(ProjectService), 'updateProject').and.returnValue(of({} as any));
    const savedSpy = spyOn(component.saved, 'emit');
    const closedSpy = spyOn(component.closed, 'emit');
    component.project = { id: 2 } as any;
    component.form.patchValue({
      name: 'Editado',
      countryCode: 'FR',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
    });
    component.loading = false;
    component.submit();
    expect(updateSpy).toHaveBeenCalledWith(2, jasmine.any(Object));
    expect(component.loading).toBeFalse();
    expect(savedSpy).toHaveBeenCalled();
    expect(closedSpy).toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    const createSpy = spyOn(TestBed.inject(ProjectService), 'createProject');
    component.form.patchValue({ name: '', countryCode: '', startDate: '', endDate: '' });
    component.submit();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should set loading to false if submit fails', () => {
    spyOn(TestBed.inject(ProjectService), 'createProject').and.returnValue({ subscribe: ({ next, error }: any) => error('fail') } as any);
    component.project = null;
    component.form.patchValue({
      name: 'Error',
      countryCode: 'ES',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    });
    component.loading = false;
    component.submit();
    expect(component.loading).toBeFalse();
  });
});
