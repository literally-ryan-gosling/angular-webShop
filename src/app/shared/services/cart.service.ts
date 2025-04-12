import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { product: Product, quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.cartSubject.next([...this.cart]); 
  }

  increaseQuantity(product: Product) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      this.cartSubject.next([...this.cart]); 
    }
  }

  decreaseQuantity(product: Product) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    } else {
      this.cart = this.cart.filter(item => item.product.id !== product.id); // Ha 1 volt, akkor eltávolítja
    }
    this.cartSubject.next([...this.cart]); 
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(item => item.product.id !== product.id);
    this.cartSubject.next([...this.cart]);
  }

  emptyCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return parseFloat(this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2));
  }  
}
