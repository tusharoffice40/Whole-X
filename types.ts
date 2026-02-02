
export enum UserRole {
  BUYER = 'BUYER',
  WHOLESALER = 'WHOLESALER',
  ADMIN = 'ADMIN'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  minOrderQuantity: number;
  stock: number;
  imageUrl: string;
  wholesalerId: string;
  wholesalerName: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  wholesalerId: string;
  buyerId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
}
