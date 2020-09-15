import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
  };

  errors: any[] = [];

  constructor(private auth: AuthenticationService, private router: Router) {}

  register(): void {
    this.auth.register(this.credentials).subscribe(
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
