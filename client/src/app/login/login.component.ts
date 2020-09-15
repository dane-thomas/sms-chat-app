import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: '',
  };

  errors: any[] = [];

  constructor(private auth: AuthenticationService, private router: Router) {}

  login(): void {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        console.error(err);
        if (err.error.message) {
          this.errors = [err.error.message];
        } else {
          this.errors = err.error.errors.map((e: any) => e.msg);
        }
      }
    );
  }
}
