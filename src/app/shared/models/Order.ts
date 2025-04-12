import { Product } from './Product';

export interface Order {
  id: string;
  userId: string;
  products: { product: Product, quantity: number }[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

  