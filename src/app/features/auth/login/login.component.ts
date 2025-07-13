import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LangSwitcherComponent } from '../../../shared/lang-switcher/lang-switcher.component';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    LangSwitcherComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    email: '',
    password: '',
  });
  loading = false;
  error: string | null = null;

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe((success) => {
      this.loading = false;
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.error = 'auth.login.invalid';
      }
    });
  }
}
