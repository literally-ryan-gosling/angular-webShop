import { NgModule } from '@angular/core';
import { ProductFilterPipe } from './shared/pipes/product-filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductFilterPipe,
    MatCardModule,
    FormsModule,
    CommonModule
  ],
})
export class AppModule { }
