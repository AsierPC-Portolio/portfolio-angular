import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../shared/ui/topbar/topbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectService } from '../../api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, TopbarComponent, ProjectsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  projects = signal<any[]>([]);
  totalProjects = computed(() => this.projects().length);
  totalCountries = computed(
    () => new Set(this.projects().map((p) => p.countryCode)).size,
  );
  lastProjectDate = computed(() => {
    const dates = this.projects()
      .map((p) => p.endDate || p.startDate)
      .filter(Boolean);
    if (!dates.length) return '-';
    return new Date(
      Math.max(...dates.map((d) => new Date(d).getTime())),
    ).toLocaleDateString();
  });

  constructor(private readonly projectService: ProjectService) {
    effect(() => {
      this.projectService
        .getProjects(undefined, undefined, 0, 1000, 'name')
        .subscribe((res) => {
          this.projects.set(res.content || []);
        });
    });
  }
}
