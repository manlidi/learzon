import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private firestore: AngularFirestore) {}

  addProduit(produit: any): Promise<any> {
    return this.firestore.collection('produits').add(produit);
  }

  getProduits(): Observable<any[]> {
    return this.firestore.collection('produits').valueChanges();
  }
}
