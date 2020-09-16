import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: '',
  };

  error: string;

  constructor(private auth: AuthenticationService, private router: Router) {}

  login(): void {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/chat');
      },
      (err) => {
        console.error(err);
        if (err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Email or password is incorrect';
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      // this.router.navigateByUrl('/chat');
    }
  }
}
