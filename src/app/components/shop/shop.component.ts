import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
type Product = {
  name: string;
  price: number;
  age: string;
  image: string;
  rating: number;
  award: boolean;
};

type FilterKey = 'ageRange' | 'award' | 'onSale' | 'priceRange';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 2;

  products: Product[] = [
    {
      name: 'Code & Go® Robot Mouse Activity Set',
      price: 63.99,
      age: 'Ages 4+',
      image: './assets/38ca497134b8ad0a257e31f8249927c2800e93bf.webp',
      rating: 4.5,
      award: true
    },
    {
      name: "Farmer's Market Color Sorting Set",
      price: 45.99,
      rating: 5,
      age: 'Ages 18 Mois+',
      image: './assets/ler7746.f1.webp',
      award: true
    },
    {
      name: 'Botley® the Coding Robot',
      price: 57.99,
      rating: 3,
      age: 'Ages 5+',
      image: './assets/ler7746.f1_1.webp',
      award: false
    },
    {
      name: 'Gears! Gears! Gears!® Deluxe Building Set',
      price: 35.99,
      rating: 2,
      age: 'Ages 3+',
      image: './assets/ler7746.f2.webp',
      award: true
    }
  ];

  filteredProducts: Product[] = [];

  activeFilters: {
    ageRange: string[];
    award: string | null;
    onSale: string | null;
    priceRange: string[];
  } = {
      ageRange: [],
      award: null,
      onSale: null,
      priceRange: []
    };
  sortOption: string = 'Top Picks';

  filters = [
    { id: 1, name: 'Age Range', options: ['0–2', '3–4', '5+'] },
    { id: 2, name: 'Award Winner', options: ['Yes'] },
    { id: 3, name: 'On Sale', options: ['Yes', 'No'] },
    { id: 4, name: 'Price', options: ['$0–$25', '$25–$50', '$50+'] }
  ];

  ngOnInit(): void {
    this.applyFilters();
  }
  getMinAge(ageStr: string): number {
    const match = ageStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  get pagedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number[] {
    const pages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }


  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesAge = this.activeFilters.ageRange.length === 0 || this.activeFilters.ageRange.some(range => {
        const productAge = this.getMinAge(product.age);
        if (range === '0–2') return productAge <= 2;
        if (range === '3–4') return productAge >= 3 && productAge <= 4;
        if (range === '5+') return productAge >= 5;
        return true;
      });


      const matchesAward = this.activeFilters.award === null ||
        product.award === (this.activeFilters.award === 'Yes');

      const matchesPrice = this.activeFilters.priceRange.length === 0 ||
        this.activeFilters.priceRange.some(range => {
          if (range === '$0–$25') return product.price <= 25;
          if (range === '$25–$50') return product.price > 25 && product.price <= 50;
          if (range === '$50+') return product.price > 50;
          return true;
        });
      switch (this.sortOption) {
        case 'PriceLowHigh':
          this.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'PriceHighLow':
          this.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'RatingHighLow':
          this.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }

      return matchesAge && matchesAward && matchesPrice;
    });


    this.currentPage = 1;
  }

  onFilterChange(filterName: string, option: string, checked: boolean): void {
    const map: Record<string, FilterKey> = {
      'Age Range': 'ageRange',
      'Award Winner': 'award',
      'On Sale': 'onSale',
      'Price': 'priceRange'
    };

    const key = map[filterName];

    if (key === 'award' || key === 'onSale') {
      this.activeFilters[key] = checked ? option : null;
    } else {
      const index = this.activeFilters[key].indexOf(option);
      if (checked && index === -1) {
        this.activeFilters[key].push(option);
      } else if (!checked && index > -1) {
        this.activeFilters[key].splice(index, 1);
      }
    }

    this.applyFilters();
  }
  get totalPagesCount(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
    }
  }
}
