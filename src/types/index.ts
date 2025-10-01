export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  images: string[];
  mileage?: number;
  fuelType: 'gasolina' | 'diesel' | 'electrico' | 'hibrido';
  transmission: 'manual' | 'automatica';
  color: string;
  condition: 'nuevo' | 'seminuevo' | 'usado';
  status: 'disponible' | 'vendido' | 'reservado';
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: number;
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
