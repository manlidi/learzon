import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authState } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private auth = inject(Auth);
  private router = inject(Router);

  canActivate() {
    return authState(this.auth).pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
