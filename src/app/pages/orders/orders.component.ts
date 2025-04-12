import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/Order';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [CommonModule, MatTableModule, RouterModule, MatCardModule, MatButtonModule] 
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoggedIn = false;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; if (this.isLoggedIn) {
      this.orderService.getOrders().subscribe((data) => { this.orders = data; });
  }
}}
