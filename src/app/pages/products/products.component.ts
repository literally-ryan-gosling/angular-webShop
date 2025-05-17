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
  selectedQuery: string = 'all';
  minPriceRange: number = 0;
  maxPriceRange: number = 0;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
  }

  onQueryChange() {
    this.loadProducts();
  }

  loadProducts() {
    switch (this.selectedQuery) {
      case 'priceAsc':
        this.productService.getProductsSortedByPriceAsc().subscribe(data => this.products = data);
        break;
      case 'priceDesc':
        this.productService.getProductsSortedByPriceDesc().subscribe(data => this.products = data);
        break;
      case 'tshirt':
        this.productService.getTShirtProducts().subscribe(data => this.products = data);
        break;
      case 'above50':
        this.productService.getProductsAbovePrice(50).subscribe(data => this.products = data);
        break;
      case 'top3':
        this.productService.getTopExpensiveProducts(3).subscribe(data => this.products = data);
        break;
      case 'priceRange':
        if (this.minPriceRange >= 0 && this.maxPriceRange > 0 && this.maxPriceRange >= this.minPriceRange) {
          this.productService.getProductsInPriceRange(this.minPriceRange, this.maxPriceRange).subscribe(data => this.products = data);
        } else {
          this.products = [];
        }
        break;
      default:
        this.productService.getAllProducts().subscribe(data => this.products = data);
    }
  }

  loadProductsByPriceRange() {
    if (this.minPriceRange >= 0 && this.maxPriceRange > 0 && this.maxPriceRange >= this.minPriceRange) {
      this.productService.getProductsInPriceRange(this.minPriceRange, this.maxPriceRange).subscribe(data => this.products = data);
    } else {
      this.products = [];
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log("Added to cart:", product);
  }
}
