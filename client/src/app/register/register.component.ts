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
    firstName: '',
    lastName: '',
    password: '',
  };

  errors: any[] = [];

  constructor(private auth: AuthenticationService, private router: Router) {}

  register(): void {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/chat');
      },
      (err) => {
        console.error(err);
        this.errors = err.error.errors.map((e: any) => e.msg);
      }
    );
  }
}
