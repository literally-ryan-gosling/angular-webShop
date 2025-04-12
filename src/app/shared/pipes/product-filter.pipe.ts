import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter',
  standalone: true 
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
