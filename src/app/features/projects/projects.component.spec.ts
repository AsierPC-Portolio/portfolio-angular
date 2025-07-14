import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from '../../api';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

// Mock ProjectService
class MockProjectService {
  getProjects() {
    return of({ content: [], totalElements: 0 });
  }
  deleteProject() {
    return of({});
  }
}

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: { getTranslation: () => of({}) } },
        }),
        ProjectsComponent,
      ],
      providers: [
        { provide: ProjectService, useClass: MockProjectService },
        TranslateService,
        TranslateStore,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open new project form and reset editingProject', () => {
    // Pre-asigna un valor a editingProject para simular edición previa
    component.editingProject.set({ id: 123, name: 'Test', countryCode: 'ES' } as any);
    component.showForm.set(false);
    component.openNewProject();
    expect(component.showForm()).toBeTrue();
    expect(component.editingProject()).toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects and total on init', () => {
    // Cambia el mock para devolver datos
    const mockProjects = [
      { id: 1, name: 'Test', countryCode: 'ES' },
      { id: 2, name: 'Otro', countryCode: 'FR' },
    ];
    const mockTotal = 2;
    spyOn(TestBed.inject(ProjectService), 'getProjects').and.returnValue(
      of({ content: mockProjects, totalElements: mockTotal }) as any
    );
    component.load();
    fixture.detectChanges();
    expect(component.projects()).toEqual(mockProjects);
    expect(component.total()).toBe(mockTotal);
  });

  it('should change page and reload projects', () => {
    const loadSpy = spyOn(component, 'load');
    component.page.set(0);
    component.onPageChange(2);
    expect(component.page()).toBe(2);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should change filter, reset page and reload projects', () => {
    const loadSpy = spyOn(component, 'load');
    component.page.set(5);
    component.onFilterChange();
    expect(component.page()).toBe(0);
    expect(loadSpy).toHaveBeenCalled();
  });
  it('should open edit project form and set editingProject', () => {
    const project = { id: 5, name: 'Editar', countryCode: 'FR' } as any;
    component.editingProject.set(null);
    component.showForm.set(false);
    component.openEditProject(project);
    expect(component.showForm()).toBeTrue();
    expect(component.editingProject()).toEqual(project);
  });
  it('should close the form', () => {
    component.showForm.set(true);
    component.closeForm();
    expect(component.showForm()).toBeFalse();
  });
  it('should set and cancel confirmDeleteProject', () => {
    const project = { id: 7, name: 'Borrar', countryCode: 'DE' } as any;
    component.confirmDeleteProject.set(null);
    component.askDeleteProject(project);
    expect(component.confirmDeleteProject()).toEqual(project);
    component.cancelDeleteProject();
    expect(component.confirmDeleteProject()).toBeNull();
  });
  it('should delete project and reset deletingId and confirmDeleteProject', () => {
    const project = { id: 10, name: 'Eliminar', countryCode: 'IT' } as any;
    component.confirmDeleteProject.set(project);
    component.deletingId.set(null);
    const deleteSpy = spyOn(TestBed.inject(ProjectService), 'deleteProject').and.returnValue(of({}) as any);
    const loadSpy = spyOn(component, 'load');
    component.deleteProjectConfirmed();
    expect(deleteSpy).toHaveBeenCalledWith(10);
    expect(component.deletingId()).toBeNull();
    expect(component.confirmDeleteProject()).toBeNull();
    expect(loadSpy).toHaveBeenCalled();
  });
    it('should change page and reload projects', () => {
    const loadSpy = spyOn(component, 'load');
    component.page.set(0);
    component.onPageChange(2);
    expect(component.page()).toBe(2);
    expect(loadSpy).toHaveBeenCalled();
  });
  it('should change filter, reset page and reload projects', () => {
    const loadSpy = spyOn(component, 'load');
    component.page.set(5);
    component.onFilterChange();
    expect(component.page()).toBe(0);
    expect(loadSpy).toHaveBeenCalled();
  });
  it('should reload projects when onProjectSaved is called', () => {
    const loadSpy = spyOn(component, 'load');
    component.onProjectSaved();
    expect(loadSpy).toHaveBeenCalled();
  });
  it('should call openEditProject from rowActions', () => {
    const project = { id: 42, name: 'Acción', countryCode: 'US' } as any;
    const spy = spyOn(component, 'openEditProject');
    // rowActions[0].action debe llamar a openEditProject
    component.rowActions[0].action(project);
    expect(spy).toHaveBeenCalledWith(project);
  });
  it('should set loading to false if load fails', () => {
    const errorMock = { error: 'fail' };
    spyOn(TestBed.inject(ProjectService), 'getProjects').and.returnValue({
      subscribe: ({ next, error }: any) => error(errorMock)
    } as any);
    component.loading.set(true);
    component.load();
    expect(component.loading()).toBeFalse();
  });
  it('should set projects to [] if response content is undefined', () => {
    spyOn(TestBed.inject(ProjectService), 'getProjects').and.returnValue(
      of({ totalElements: 0 }) as any
    );
    component.projects.set([{ id: 1, name: 'Test', countryCode: 'ES' } as any]);
    component.load();
    expect(component.projects()).toEqual([]);
  });
  it('should not call deleteProject if confirmDeleteProject has no id', () => {
    component.confirmDeleteProject.set({} as any);
    const deleteSpy = spyOn(TestBed.inject(ProjectService), 'deleteProject');
    component.deleteProjectConfirmed();
    expect(deleteSpy).not.toHaveBeenCalled();
  });
  it('should reset deletingId and confirmDeleteProject if deleteProject fails', () => {
    const project = { id: 99, name: 'Error', countryCode: 'PT' } as any;
    component.confirmDeleteProject.set(project);
    component.deletingId.set(99);
    spyOn(TestBed.inject(ProjectService), 'deleteProject').and.returnValue({
      subscribe: ({ next, error }: any) => error('fail')
    } as any);
    component.deleteProjectConfirmed();
    expect(component.deletingId()).toBeNull();
    expect(component.confirmDeleteProject()).toBeNull();
  });
});
