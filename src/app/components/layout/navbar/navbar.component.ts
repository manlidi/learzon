import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;
  activeTab: 'menu' | 'account' = 'menu';
  activeBrand: string = 'lr';
  messages: string[] = [
    '30% off your first order! Join our email list >',
    'Free shipping on orders over $79 or more!',
  ];
  currentMessage: string = this.messages[0];
  private messageIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.messageIndex = (this.messageIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.messageIndex];
    }, 8000);
  }


  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  setActiveBrand(brand: string): void {
    this.activeBrand = brand;
  }
}
