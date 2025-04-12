import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);

  getOrders() {
    return this.ordersSubject.asObservable();
  }

  placeOrder(userId: string, cart: { product: Product, quantity: number }[]) {
    const newOrder: Order = {
      id: Date.now().toString(),
      userId,
      products: cart,
      totalAmount: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'pending',
      createdAt: new Date()
    };

    this.orders.push(newOrder);
    this.ordersSubject.next([...this.orders]);
}

}
