import { create } from 'zustand';
import type { Product, Category } from '../types';

interface ProductStore {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  
  getFilteredProducts: () => Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
  
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory } = get();
    
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  },
  
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      products: [...state.products, newProduct]
    }));
  },
  
  updateProduct: (id, productData) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === id
          ? { ...product, ...productData, updatedAt: new Date() }
          : product
      )
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }));
  }
}));
