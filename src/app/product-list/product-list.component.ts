import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products: Product[];
  @Input() isLoading: boolean;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  constructor () {
  }

  onAddToCart(product : Product) {
    this.addToCart.emit(product)
  }
}
