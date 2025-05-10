import { Component } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Produit } from '../../../models/produit.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})

export class CreateProductComponent {
  produit: Produit = {
    reference: '',
    titre: '',
    age: '',
    description: '',
    image: [],
    prix: 0,
    availability: false
  };

  constructor(private produitService: ProduitService, private storage: AngularFireStorage) {}

  onSubmit() {
    this.produitService.addProduit(this.produit)
      .then(() => {
        alert('Produit ajouté avec succès');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
      });
  }

  resetForm() {
    this.produit = {
      reference: '',
      titre: '',
      age: '',
      description: '',
      image: [],
      prix: 0,
      availability: false
    };
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    const filePath = `produits_images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().toPromise().then(() => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.produit.image.push(url);
      });
    });
  }
}
