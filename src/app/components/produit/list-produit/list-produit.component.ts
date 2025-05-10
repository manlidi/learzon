import { Component } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-produit',
  imports: [CommonModule],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent {
  produits: any[] = [];

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
    });
  }

  addproduit(){
    this.router.navigate(['/addproduit']);
  }
}
