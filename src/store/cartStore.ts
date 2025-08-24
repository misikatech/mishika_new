import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      totalItems: 0,
      totalAmount: 0,

      // Actions
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(item => item.productId === newItem.productId);

        let updatedItems: CartItem[];
        
        if (existingItem) {
          updatedItems = items.map(item =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          const cartItem: CartItem = {
            ...newItem,
            id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          };
          updatedItems = [...items, cartItem];
        }

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: updatedItems,
          totalItems,
          totalAmount,
        });
      },

      removeItem: (productId) => {
        const items = get().items;
        const updatedItems = items.filter(item => item.productId !== productId);
        
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: updatedItems,
          totalItems,
          totalAmount,
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items;
        const updatedItems = items.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        );

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: updatedItems,
          totalItems,
          totalAmount,
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0,
        });
      },

      getItem: (productId) => {
        return get().items.find(item => item.productId === productId);
      },
    }),
    {
      name: STORAGE_KEYS.CART_DATA,
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      }),
    }
  )
);
