import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Package } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { formatPrice } from '../utils';

const WishlistPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, isLoading, removeFromWishlist } = useWishlist();
  const { addToCart, isAddingToCart } = useCart();

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Wishlist - Mishika</title>
          <meta name="description" content="Your wishlist at Mishika." />
        </Helmet>
        
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your wishlist</h2>
            <Link to={ROUTES.LOGIN}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle different response structures safely
  const wishlistItems = (() => {
    console.log('Raw wishlist data:', wishlist);
    
    if (!wishlist) {
      console.log('No wishlist data');
      return [];
    }
    
    // If wishlist has items property (API response format)
    if (wishlist.items && Array.isArray(wishlist.items)) {
      console.log('Found items array:', wishlist.items);
      return wishlist.items;
    }
    
    // If wishlist has data.items property
    if (wishlist.data && wishlist.data.items && Array.isArray(wishlist.data.items)) {
      console.log('Found data.items array:', wishlist.data.items);
      return wishlist.data.items;
    }
    
    // If wishlist is directly an array
    if (Array.isArray(wishlist)) {
      console.log('Wishlist is direct array:', wishlist);
      return wishlist;
    }
    
    // If wishlist.data is an array
    if (wishlist.data && Array.isArray(wishlist.data)) {
      console.log('Wishlist.data is array:', wishlist.data);
      return wishlist.data;
    }
    
    console.log('No valid array found, returning empty array');
    return [];
  })();

  console.log('Final wishlistItems:', wishlistItems);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({ productId, quantity: 1 });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - Mishika</title>
        <meta name="description" content="Your wishlist at Mishika." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start adding items to your wishlist to save them for later.</p>
              <Link to={ROUTES.PRODUCTS}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item: any) => {
                const product = item.product || item;
                const productId = product.id || item.productId;
                
                return (
                  <div key={item.id || productId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/products/${productId}`} className="block">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.images?.[0] || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`/products/${productId}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {product.category && (
                        <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(product.salePrice || product.price)}
                          </span>
                          {product.salePrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleAddToCart(productId)}
                          disabled={isAddingToCart || product.stock === 0}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                          size="sm"
                        >
                          {isAddingToCart ? (
                            <div className="flex items-center justify-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Adding...
                            </div>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                        
                        <Button
                          onClick={() => handleRemoveFromWishlist(productId)}
                          variant="outline"
                          size="sm"
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
