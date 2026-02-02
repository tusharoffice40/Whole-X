
import { Product, UserRole } from './types';

export const CATEGORIES = [
  "Clothing",
  "Electronics",
  "Home & Kitchen",
  "Health & Beauty",
  "Industrial Tools",
  "Food & Beverage"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton Plain T-Shirts',
    description: 'High-quality 180 GSM cotton t-shirts suitable for printing and resale. Available in various colors.',
    category: 'Clothing',
    pricePerUnit: 4.5,
    minOrderQuantity: 50,
    stock: 2500,
    imageUrl: 'https://picsum.photos/seed/clothing1/400/400',
    wholesalerId: 'w1',
    wholesalerName: 'Apparel Hub Global'
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Earbuds Pro',
    description: 'Noise-cancelling wireless earbuds with 24-hour battery life. Perfect for tech retailers.',
    category: 'Electronics',
    pricePerUnit: 12.0,
    minOrderQuantity: 20,
    stock: 500,
    imageUrl: 'https://picsum.photos/seed/tech1/400/400',
    wholesalerId: 'w2',
    wholesalerName: 'NextGen Electronics'
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottles (1L)',
    description: 'Eco-friendly double-walled vacuum insulated bottles. Bulk packaging available.',
    category: 'Home & Kitchen',
    pricePerUnit: 6.8,
    minOrderQuantity: 100,
    stock: 1200,
    imageUrl: 'https://picsum.photos/seed/home1/400/400',
    wholesalerId: 'w3',
    wholesalerName: 'EcoLifestyle Wholesalers'
  },
  {
    id: '4',
    name: 'Organic Lavender Essential Oil',
    description: '100% pure therapeutic grade essential oil. Bulk 500ml containers.',
    category: 'Health & Beauty',
    pricePerUnit: 15.0,
    minOrderQuantity: 10,
    stock: 150,
    imageUrl: 'https://picsum.photos/seed/beauty1/400/400',
    wholesalerId: 'w4',
    wholesalerName: 'Natura Oils Co.'
  },
  {
    id: '5',
    name: 'Heavy Duty LED Work Lights',
    description: 'IP65 waterproof rechargeable work lights for industrial use.',
    category: 'Industrial Tools',
    pricePerUnit: 25.0,
    minOrderQuantity: 15,
    stock: 300,
    imageUrl: 'https://picsum.photos/seed/tools1/400/400',
    wholesalerId: 'w5',
    wholesalerName: 'Industrial Giants'
  },
  {
    id: '6',
    name: 'Roasted Arabica Coffee Beans',
    description: 'Medium roast fair-trade Arabica beans. 5kg bulk bags.',
    category: 'Food & Beverage',
    pricePerUnit: 42.0,
    minOrderQuantity: 5,
    stock: 100,
    imageUrl: 'https://picsum.photos/seed/coffee1/400/400',
    wholesalerId: 'w6',
    wholesalerName: 'Global Beans Importers'
  }
];
