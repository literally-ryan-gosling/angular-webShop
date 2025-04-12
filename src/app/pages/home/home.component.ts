import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductObject } from '../../shared/constant';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, RouterLink, CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
  
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  products = ProductObject;
  currentIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  changePage() {
    this.router.navigateByUrl("/tasks");
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
  }  
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
  }
  
}
