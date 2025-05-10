import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learzon';
  isDashboard = false;

  constructor(private router: Router, private auth: Auth) {
    this.auth.onAuthStateChanged(user => {
      if (user && this.router.url === '/') {
        this.router.navigate(['/dashboard']);
      }
    });

  }
}
