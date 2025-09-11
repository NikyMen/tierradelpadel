import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem, Product } from '../types';

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            const updatedItems = state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            return { items: updatedItems, total };
          } else {
            const newItem: CartItem = { product, quantity };
            const updatedItems = [...state.items, newItem];
            const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            return { items: updatedItems, total };
          }
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.product.id !== productId);
          const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          return { items: updatedItems, total };
        });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => {
          const updatedItems = state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
          const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          return { items: updatedItems, total };
        });
      },
      
      clearCart: () => {
        set({ items: [], total: 0 });
      },
      
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
