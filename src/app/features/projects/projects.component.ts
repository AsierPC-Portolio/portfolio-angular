// ...existing code...
import { Component, signal, effect } from '@angular/core';
import { ProjectFormComponent } from './project-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, ProjectService } from '../../api';
import { TranslateModule } from '@ngx-translate/core';
import {
  UiTableComponent,
  UiTableColumn,
} from '../../shared/ui/table/table.component';
import { InputComponent as UiInputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent as UiButtonComponent } from '../../shared/ui/button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { ModalComponent } from '../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    UiTableComponent,
    ProjectFormComponent,
    UiInputComponent,
    UiButtonComponent,
    NgIcon,
    ModalComponent,
  ],
  templateUrl: './projects.component.html',
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
})
export class ProjectsComponent {
  deletingId = signal<number | null>(null);
  confirmDeleteProject = signal<Project | null>(null);
  rowActions = [
    {
      icon: 'edit',
      label: 'common.edit',
      action: (project: Project) => this.openEditProject(project),
    },
  ];
  showForm = signal(false);
  editingProject = signal<Project | null>(null);
  projects = signal<Project[]>([]);
  columns: UiTableColumn[] = [
    { key: 'name', label: 'projects.name', sortable: true },
    { key: 'countryCode', label: 'projects.country', sortable: true },
    { key: 'startDate', label: 'projects.start', sortable: true },
    { key: 'endDate', label: 'projects.end', sortable: true },
  ];
  total = signal(0);
  page = signal(0);
  size = signal(10);
  sort = signal('name,asc');
  filter = signal('');
  loading = signal(false);

  constructor(private readonly projectService: ProjectService) {
    this.load();
    effect(() => {
      this.load();
    });
  }

  load() {
    this.loading.set(true);
    this.projectService
      .getProjects(
        this.filter(),
        undefined,
        this.page(),
        this.size(),
        this.sort(),
      )
      .subscribe({
        next: (res) => {
          this.projects.set(res.content || []);
          this.total.set(res.totalElements || 0);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onPageChange(page: number) {
    this.page.set(page);
    this.load();
  }

  onFilterChange() {
    this.page.set(0);
    this.load();
  }
  askDeleteProject(project: Project) {
    this.confirmDeleteProject.set(project);
  }

  cancelDeleteProject() {
    this.confirmDeleteProject.set(null);
  }

  deleteProjectConfirmed() {
    const project = this.confirmDeleteProject();
    if (!project?.id) return;
    this.deletingId.set(project.id);
    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.confirmDeleteProject.set(null);
        this.load();
      },
      error: () => {
        this.deletingId.set(null);
        this.confirmDeleteProject.set(null);
      },
    });
  }

  openNewProject() {
    this.editingProject.set(null);
    this.showForm.set(true);
  }

  openEditProject(project: Project) {
    this.editingProject.set(project);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  onProjectSaved() {
    this.load();
  }
  
}
