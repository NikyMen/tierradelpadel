export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface WhatsAppMessage {
  products: CartItem[];
  total: number;
  customerInfo?: {
    name?: string;
    phone?: string;
  };
}
