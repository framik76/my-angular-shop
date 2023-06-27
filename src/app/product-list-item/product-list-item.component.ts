import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() product: Product; 
  @Input() isLoading: boolean;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  getImageSrc(): string {
    return `assets/${this.product.imageSrc}`
  }
  
  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
