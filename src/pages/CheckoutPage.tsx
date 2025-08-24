import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CreditCard, Smartphone, Banknote, MapPin, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { useCheckout } from '../hooks/useOrders';
import { useAddresses } from '../hooks/useAddresses';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { AddressFormModal } from '../components/modals/AddressFormModal';
import { ROUTES } from '../constants';
import { formatPrice } from '../utils';
import toast from 'react-hot-toast';

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, total, clearCart } = useCart();
  const { initiateCheckout, createOrder, isCheckingOut, isCreatingOrder } = useCheckout();
  const { addresses, isLoading: addressesLoading } = useAddresses();

  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'STRIPE' | 'UPI' | 'NET_BANKING'>('COD');
  const [notes, setNotes] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Set default address when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress.id);
    }
  }, [addresses, selectedAddress]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (items.length === 0) {
      navigate(ROUTES.CART);
      return;
    }
  }, [isAuthenticated, items, navigate]);

  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);
  const shippingCost = subtotal >= 999 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const totalAmount = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    try {
      const orderData = {
        addressId: selectedAddress,
        paymentMethod,
        notes: notes.trim() || undefined,
      };

      console.log('Creating order with data:', orderData);
      const response = await createOrder(orderData);
      
      console.log('Full order response:', response);
      
      const orderId = response?.data?.id;
      
      if (orderId) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate(`/orders/${orderId}/confirmation`);
      } else {
        console.error('No order ID in response:', response);
        throw new Error('Order created but no ID returned');
      }
    } catch (error: any) {
      console.error('Order creation failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to place order. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleAddressAdded = () => {
    // Addresses will be automatically refetched due to React Query
    setShowAddressForm(false);
  };

  if (!isAuthenticated || items.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Misika</title>
        <meta name="description" content="Complete your order at Misika" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(ROUTES.CART)}
            className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Cart
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddressForm(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add New Address
                  </Button>
                </div>

                {addressesLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No addresses found</p>
                    <Button onClick={() => setShowAddressForm(true)}>
                      Add Your First Address
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAddress === address.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-start">
                          <MapPin size={20} className="text-gray-400 mt-1 mr-3" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{address.name}</span>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-600">{address.phone}</span>
                              {address.isDefault && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {address.street}, {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'COD', label: 'Cash on Delivery', icon: <Banknote size={20} />, desc: 'Pay when you receive' },
                    { id: 'STRIPE', label: 'Credit/Debit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard, etc.' },
                    { id: 'UPI', label: 'UPI Payment', icon: <Smartphone size={20} />, desc: 'PhonePe, GPay, Paytm' },
                    { id: 'NET_BANKING', label: 'Net Banking', icon: <CreditCard size={20} />, desc: 'All major banks' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
                        className="sr-only"
                      />
                      <div className="text-indigo-600 mr-3">{method.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{method.label}</div>
                        <div className="text-sm text-gray-600">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Notes (Optional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions for delivery..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-2">{notes.length}/500 characters</p>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images?.[0] || '/placeholder-image.jpg'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm">
                        {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({items.length} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST 18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Truck size={16} className="mr-2" />
                      Free shipping on orders above ₹999
                    </div>
                    <div className="flex items-center">
                      <Shield size={16} className="mr-2" />
                      100% secure payment
                    </div>
                    <div className="flex items-center">
                      <RotateCcw size={16} className="mr-2" />
                      Easy 7-day returns
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isCreatingOrder || !selectedAddress}
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-lg font-semibold"
                >
                  {isCreatingOrder ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Placing Order...
                    </div>
                  ) : (
                    `Place Order • ${formatPrice(totalAmount)}`
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={showAddressForm}
        onClose={() => setShowAddressForm(false)}
        onAddressAdded={handleAddressAdded}
      />
    </>
  );
};

export default CheckoutPage;
