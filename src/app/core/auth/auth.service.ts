import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../api/api/authentication.service';
import { LoginRequest, RegisterRequest } from '../../api';
import { map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthenticationService);
  private readonly router = inject(Router);

  login(email: string, password: string) {
    const body: LoginRequest = { email, password };
    return this.api.loginUser(body).pipe(
      map((res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          return true;
        }
        return false;
      }),
      catchError(() => of(false)),
    );
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const body: RegisterRequest = { email, password, firstName, lastName };
    return this.api.registerUser(body);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
