import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartService, AddToCartData, UpdateCartData } from '../services/cart';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  // Get cart query - only fetch if authenticated
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: (data: AddToCartData) => cartService.addToCart(data),
    onSuccess: (response) => {
      toast.success(response.message || SUCCESS_MESSAGES.ITEM_ADDED_TO_CART);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || ERROR_MESSAGES.SERVER_ERROR;
      toast.error(errorMessage);
    },
  });

  // Update cart item mutation
  const updateCartMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartData }) =>
      cartService.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || ERROR_MESSAGES.SERVER_ERROR;
      toast.error(errorMessage);
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: string) => cartService.removeFromCart(itemId),
    onSuccess: (response) => {
      toast.success(response.message || SUCCESS_MESSAGES.ITEM_REMOVED_FROM_CART);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || ERROR_MESSAGES.SERVER_ERROR;
      toast.error(errorMessage);
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: (response) => {
      toast.success(response.message || 'Cart cleared successfully');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || ERROR_MESSAGES.SERVER_ERROR;
      toast.error(errorMessage);
    },
  });

  return {
    // Data
    cart: cartQuery.data?.data,
    items: cartQuery.data?.data?.items || [],
    totalItems: cartQuery.data?.data?.totalItems || 0,
    totalAmount: cartQuery.data?.data?.totalAmount || 0,
    subtotal: cartQuery.data?.data?.subtotal || 0,
    tax: cartQuery.data?.data?.tax || 0,
    shipping: cartQuery.data?.data?.shipping || 0,
    
    // Loading states
    isLoading: cartQuery.isLoading,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateCartMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
    isClearing: clearCartMutation.isPending,
    
    // Actions
    addToCart: addToCartMutation.mutateAsync,
    updateCartItem: updateCartMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    
    // Utility functions
    getItemQuantity: (productId: string) => {
      const items = cartQuery.data?.data?.items || [];
      return items
        .filter((item: any) => item.productId === productId)
        .reduce((total: number, item: any) => total + item.quantity, 0);
    },
  };
};
