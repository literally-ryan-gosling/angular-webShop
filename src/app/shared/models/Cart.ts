import { Product } from './Product';

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  