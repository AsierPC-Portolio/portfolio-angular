import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project, ProjectService } from '../../api';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { InputComponent as UiInputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent as UiButtonComponent } from '../../shared/ui/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    TranslateModule,
    UiInputComponent,
    UiButtonComponent,
  ],
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent implements OnChanges {
  @Input() open = false;
  @Input() project: Project | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      countryCode: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      // Puedes añadir más campos según el modelo
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project'] && this.project) {
      this.form.patchValue(this.project);
    } else if (changes['open'] && this.open && !this.project) {
      this.form.reset();
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const data = { ...this.project, ...this.form.value };
    const obs = data.id
      ? this.projectService.updateProject(data.id, data)
      : this.projectService.createProject(data);
    obs.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
        this.closed.emit();
      },
      error: () => (this.loading = false),
    });
  }
}
