import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../../../services/produit.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    });
  }

  addproduit() {
    this.router.navigate(['/dashboard/addproduit']);
  }
}
