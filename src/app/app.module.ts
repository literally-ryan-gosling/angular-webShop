import { NgModule } from '@angular/core';
import { ProductFilterPipe } from './shared/pipes/product-filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductFilterPipe,
    MatCardModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  imports: [
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class AppModule { }
