import { Component } from '@angular/core';
import { ProduitService, Produit } from '../../../services/produit.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
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

  constructor(private produitService: ProduitService, private storage: Storage) { }

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

  async onImageChange(event: any) {
    const files: FileList = event.target.files;
    if (!files.length) return;

    for (const file of Array.from(files)) {
      const filePath = `produits_images/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);

      try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        this.produit.image.push(url);
      } catch (error) {
        console.error("Erreur d'upload :", error);
      }
    }
  }
}
