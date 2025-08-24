import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orders';
import { QUERY_KEYS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import toast from 'react-hot-toast';

export const useOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.LIST,
    queryFn: () => orderService.getOrders(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.DETAIL(orderId),
    queryFn: () => orderService.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: (data: any) => orderService.createOrder(data),
    onSuccess: (response) => {
      toast.success(SUCCESS_MESSAGES.ORDER_PLACED);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART.ITEMS });
      return response;
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      toast.success('Order cancelled successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  return {
    createOrder: createOrderMutation.mutateAsync,
    cancelOrder: cancelOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    isCancellingOrder: cancelOrderMutation.isPending,
  };
};
