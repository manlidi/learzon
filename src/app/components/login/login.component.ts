import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.loginWithEmail(this.email, this.password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => alert(err.message));
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => alert(err.message));
  }
}
