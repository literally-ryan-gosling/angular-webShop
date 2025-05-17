import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service'; 
import { Product } from '../../shared/models/Product'; 
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { OrderService } from '../../shared/services/order.service'; 
import { Router, RouterLink } from '@angular/router'; 
import { RouterModule } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({ 
  standalone: true, 
  selector: 'app-cart', 
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule], 
  templateUrl: './cart.component.html', 
  styleUrl: './cart.component.scss' }) 
  export class CartComponent implements OnInit { 
    cart: { product: Product, quantity: number }[] = []; 
    displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'actions']; 
    isLoggedIn = false; 

    constructor(private cartService: CartService, private orderService: OrderService, private router: Router, private snackBar: MatSnackBar) {}

    ngOnInit() { 
      this.cartService.getCart().subscribe((data) => { this.cart = data; }); 
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
    } 

    async placeOrder() {
      if (!this.isLoggedIn) {
        return;
      }
      const userId = localStorage.getItem('userId') || 'user123';
      await this.orderService.placeOrder(userId, this.cart);
      this.cartService.emptyCart();
      this.showSnackBar("Your order has been placed successfully!");
    } 

    showSnackBar(message: string) {
      this.snackBar.open(message, "Close", {
        duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }); 
    }

    increaseQuantity(product: Product) { 
      this.cartService.increaseQuantity(product); 
    } 

    decreaseQuantity(product: Product) { 
      this.cartService.decreaseQuantity(product); 
    } 
        
    removeFromCart(product: Product) { 
      this.cartService.removeFromCart(product); 
    } 
        
    public emptyCart() { 
      this.cartService.emptyCart(); 
    } 

    getTotal(): number { 
      return Number(this.cartService.getTotal().toFixed(2));
    } 
     
  }