export interface CartItem {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountedPrice: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}