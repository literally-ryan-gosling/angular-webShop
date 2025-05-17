import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, CollectionReference, query, where, orderBy, limit, QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
    providedIn: 'root'
  })
export class ProductService{
  private productsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'Products');
  }

  getAllProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      getDocs(this.productsCollection).then((querySnapshot) => {
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data['image'] && data['name'] && data['category'] && data['description'] && data['price']) {
            let idNumber: number;
            if (typeof data['id'] === 'number') {
              idNumber = data['id'];
            } else {
              idNumber = parseInt(doc.id, 10);
            }
            products.push({
              id: idNumber,
              image: data['image'],
              name: data['name'],
              category: data['category'],
              description: data['description'],
              price: data['price']
            });
          } else {
            console.warn(`Document ${doc.id} has missing properties`, data);
          }
        });
        observer.next(products);
        observer.complete();
      }).catch((error) => {
        console.error('Error fetching products:', error);
        observer.error(error);
      });
    });
  }

  getProductsSortedByPriceAsc(): Observable<Product[]> {
    return this.queryProducts([orderBy('price', 'asc')]);
  }

  getTShirtProducts(): Observable<Product[]> {
    return this.queryProducts([where('category', '==', 't-shirt')]);
  }

  getProductsAbovePrice(minPrice: number): Observable<Product[]> {
    return this.queryProducts([where('price', '>', minPrice)]);
  }

  getTopExpensiveProducts(top: number): Observable<Product[]> {
    return this.queryProducts([orderBy('price', 'desc'), limit(top)]);
  }

  private queryProducts(constraints: QueryConstraint[]): Observable<Product[]> {
    return new Observable((observer) => {
      const q = query(this.productsCollection, ...constraints);
      getDocs(q).then((querySnapshot) => {
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data['image'] && data['name'] && data['category'] && data['description'] && data['price']) {
            let idNumber: number;
            if (typeof data['id'] === 'number') {
              idNumber = data['id'];
            } else {
              idNumber = parseInt(doc.id, 10);
            }
            products.push({
              id: idNumber,
              image: data['image'],
              name: data['name'],
              category: data['category'],
              description: data['description'],
              price: data['price']
            });
          }
        });
        observer.next(products);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  addProduct(product: Product) {
    return addDoc(this.productsCollection, product);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return updateDoc(doc(this.firestore, 'products', id), product);
  }

  deleteProduct(id: string) {
    return deleteDoc(doc(this.firestore, 'products', id));
  }
}