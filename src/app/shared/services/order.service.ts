import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Firestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private ordersCollection;

  constructor(private firestore: Firestore) {
    this.ordersCollection = collection(this.firestore, 'Orders');
  }

  async placeOrder(userId: string, cart: { product: Product, quantity: number }[]) {
    const newOrder: Order = {
      id: Date.now().toString(),
      userId,
      products: cart,
      totalAmount: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'pending',
      createdAt: new Date()
    };
    await addDoc(this.ordersCollection, {
      ...newOrder,
      createdAt: newOrder.createdAt.toISOString(),
    });
    this.orders.push(newOrder);
    this.ordersSubject.next([...this.orders]);
  }

  async fetchOrdersForUser(userId: string) {
    const q = query(this.ordersCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        userId: data['userId'],
        products: data['products'],
        totalAmount: data['totalAmount'],
        status: data['status'],
        createdAt: new Date(data['createdAt'])
      });
    });
    this.ordersSubject.next(orders);
  }

  async deleteOrder(orderId: string) {
    const orderDoc = doc(this.firestore, 'Orders', orderId);
    await deleteDoc(orderDoc);
    this.orders = this.orders.filter(order => order.id !== orderId);
    this.ordersSubject.next([...this.orders]);
  }

  getOrders() {
    return this.ordersSubject.asObservable();
  }
}
