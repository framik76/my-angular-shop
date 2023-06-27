export interface CartProduct {
  id: number;
  name: string;
  quantity: number;
  imageSrc: string;
  price: number;
}

export interface Cart {
  products: CartProduct[];
  total: number;
}
