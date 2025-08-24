import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addressService, CreateAddressData, UpdateAddressData } from '../services/addresses';
import toast from 'react-hot-toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

export const useAddresses = () => {
  const queryClient = useQueryClient();

  // Get addresses query
  const addressesQuery = useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressService.getAddresses(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Create address mutation
  const createAddressMutation = useMutation({
    mutationFn: (data: CreateAddressData) => addressService.createAddress(data),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ADDRESS_ADDED);
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Update address mutation
  const updateAddressMutation = useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: UpdateAddressData }) =>
      addressService.updateAddress(addressId, data),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ADDRESS_UPDATED);
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: (addressId: string) => addressService.deleteAddress(addressId),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ADDRESS_DELETED);
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Set default address mutation
  const setDefaultAddressMutation = useMutation({
    mutationFn: (addressId: string) => addressService.setDefaultAddress(addressId),
    onSuccess: () => {
      toast.success('Default address updated');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  return {
    addresses: addressesQuery.data?.data || [],
    isLoading: addressesQuery.isLoading,
    error: addressesQuery.error,
    createAddress: createAddressMutation.mutate,
    updateAddress: updateAddressMutation.mutate,
    deleteAddress: deleteAddressMutation.mutate,
    setDefaultAddress: setDefaultAddressMutation.mutate,
    isCreating: createAddressMutation.isPending,
    isUpdating: updateAddressMutation.isPending,
    isDeleting: deleteAddressMutation.isPending,
    isSettingDefault: setDefaultAddressMutation.isPending,
  };
};