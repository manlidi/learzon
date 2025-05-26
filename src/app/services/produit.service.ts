import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Produit {
  reference: string;
  titre: string;
  age: string;
  description: string;
  image: string[];
  prix: number;
  availability: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private firestore: Firestore) {}

addProduit(produit: Produit): Promise<any> {
  const produitsRef = collection(this.firestore, 'produits');
  return addDoc(produitsRef, produit);
}

getProduits(): Observable<Produit[]> {
  const produitsRef = collection(this.firestore, 'produits');
  return collectionData(produitsRef, { idField: 'id' }) as Observable<Produit[]>;
}

}
