import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService{
    private products: Product[] = [
        {
            id: 1,
            image: "images/black_tshirt_lactose.jpg",
            name: "Black T-shirt",
            category: "t-shirt",
            description: "Description for Black T-shirt",
            price: 10.99
        },
        {
            id: 2,
            image: "images/blue_tshirt_lactose.jpg",
            name: "Blue T-shirt",
            category: "t-shirt",
            description: "Description for Blue T-shirt",
            price: 29.99
        },
        {
            id: 3,
            image: "images/red_tshirt_lactose.jpg",
            name: "Red t-shirt",
            category: "t-shirt",
            description: "Description for Red T-shirt",
            price: 49.99
        },
        {
            id: 4,
            image: "images/green_tshirt_lactose.jpg",
            name: "Green T-shirt",
            category: "t-shirt",
            description: "Description for Green T-shirt",
            price: 89.99
        },
        {
            id: 5,
            image: "images/yellow_tshirt_lactose.jpg",
            name: "Yellow T-shirt",
            category: "t-shirt",
            description: "Description for Yellow T-shirt",
            price: 99.99
        },
        {
            id: 6,
            image: "images/black_hoodie_lactose.jpg",
            name: "Black Hoodie",
            category: "hoodie",
            description: "Description for Black Hoodie",
            price: 10.99
        },
        {
            id: 7,
            image: "images/brown_tshirt_lactose.jpg",
            name: "Brown T-shirt",
            category: "t-shirt",
            description: "Description for Brown T-shirt",
            price: 29.99
        },
        {
            id: 8,
            image: "images/purple_tshirt_lactose.jpg",
            name: "Purple t-shirt",
            category: "t-shirt",
            description: "Description for Purple T-shirt",
            price: 49.99
        },
        {
            id: 9,
            image: "images/pink_tshirt_lactose.jpg",
            name: "Pink T-shirt",
            category: "t-shirt",
            description: "Description for Pink T-shirt",
            price: 89.99
        },
        {
            id: 10,
            image: "images/sweatshirt_lacoste_black.jpg",
            name: "Black Sweatshirt",
            category: "sweatshirt",
            description: "Description for Black Sweatshirt",
            price: 99.99
        },
        {
            id: 11,
            image: "images/t_shirt_lacoste.png",
            name: "White T-shirt",
            category: "t-shirt",
            description: "Description for White T-shirt",
            price: 10.99
        },
        {
            id: 12,
            image: "images/white_cap_lactose.jpg",
            name: "White Cap",
            category: "white cap",
            description: "Description for White cap",
            price: 49.99
        }
    ];
    private productsSubject = new BehaviorSubject<Product[]>(this.products);
  
  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }


  }