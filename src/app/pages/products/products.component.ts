import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../../shared/pipes/product-filter.pipe';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ProductFilterPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = ''; 
  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log("Added to cart:", product);
  }
  
}
