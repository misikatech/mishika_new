import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { WishlistItem, Product } from '../types';
import { storage } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { toast } from 'react-hot-toast';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
}

interface WishlistContextType extends WishlistState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

type WishlistAction =
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: WishlistState = {
  items: [],
  isLoading: false,
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.productId !== action.payload) };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from storage on mount
  useEffect(() => {
    const savedWishlist = storage.get<WishlistItem[]>(STORAGE_KEYS.WISHLIST_ITEMS) || [];
    dispatch({ type: 'LOAD_WISHLIST', payload: savedWishlist });
  }, []);

  // Save wishlist to storage whenever it changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.WISHLIST_ITEMS, state.items);
  }, [state.items]);

  const addItem = (product: Product): void => {
    const wishlistItem: WishlistItem = {
      id: `wishlist-${product.id}`,
      userId: 'current-user', // This should come from auth context
      productId: product.id,
      product,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_ITEM', payload: wishlistItem });
    toast.success(`${product.name} added to wishlist`);
  };

  const removeItem = (productId: string): void => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast.success('Item removed from wishlist');
  };

  const clearWishlist = (): void => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.success('Wishlist cleared');
  };

  const isInWishlist = (productId: string): boolean => {
    return state.items.some(item => item.productId === productId);
  };

  const value: WishlistContextType = {
    ...state,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

// Export the context for direct access if needed
export { WishlistContext };
