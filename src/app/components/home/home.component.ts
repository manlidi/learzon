import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  ageRange: string;
  price: number;
  isNew: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
constructor(private router: Router) {}

  products: Product[] = [
    { id: 1, name: 'Skill Builders! Number Learning Kit', imageUrl: 'assets/0ccc10fba1de02c66519d0353430e1f84ac8d765.webp', ageRange: 'Ages 4+', price: 16.99, isNew: true },
    { id: 2, name: 'Sorting Sweets Treats Mini Oven', imageUrl: 'assets/2cd3d4ce2e50ed9738bf084155d59d2ab3a4df30.webp', ageRange: 'Ages 3+', price: 24.99, isNew: true },
    { id: 3, name: 'Ocean Emotion Seashells', imageUrl: 'assets/38ca497134b8ad0a257e31f8249927c2800e93bf.webp', ageRange: 'Ages 18+ Months', price: 16.99, isNew: true },
    { id: 4, name: 'Mini Counting Cupcakes', imageUrl: 'assets/0ccc10fba1de02c66519d0353430e1f84ac8d765.webp', ageRange: 'Ages 3+', price: 21.99, isNew: true },
    { id: 5, name: 'Math Adventure Puzzle', imageUrl: 'assets/0ccc10fba1de02c66519d0353430e1f84ac8d765.webp', ageRange: 'Ages 5+', price: 19.99, isNew: false },
    { id: 6, name: 'Colors & Shapes Box', imageUrl: 'assets/0ccc10fba1de02c66519d0353430e1f84ac8d765.webp', ageRange: 'Ages 2+', price: 14.99, isNew: true },
    { id: 7, name: 'Animal Sorting Safari', imageUrl: 'assets/0ccc10fba1de02c66519d0353430e1f84ac8d765.webp', ageRange: 'Ages 3+', price: 22.99, isNew: false },
    { id: 8, name: 'Little Engineer Toolkit', imageUrl: 'assets/0ccc10fba1de02c66519d0353430e1f84ac8d765.webp', ageRange: 'Ages 4+', price: 25.99, isNew: true },
  ];

  currentIndex = 0;
  visibleProducts: Product[] = [];
  itemsPerPage = 4;


  goToItem(): void {
    this.router.navigate(['/item']);
  }

  ngOnInit(): void {
    this.setItemsPerPage();
    this.updateVisibleProducts();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  setItemsPerPage() {
    this.itemsPerPage = window.innerWidth <= 768 ? 2 : 4;
  }

  handleResize = () => {
    this.setItemsPerPage();
    this.currentIndex = 0;
    this.updateVisibleProducts();
  }

  updateVisibleProducts() {
    this.visibleProducts = this.products.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.products.length) {
      this.currentIndex += this.itemsPerPage;
      this.updateVisibleProducts();
    }
  }

  prev() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
      this.updateVisibleProducts();
    }
  }

}
