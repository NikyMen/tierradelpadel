import React from 'react';
import { Plus, Minus, Trash2, Package } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeItem(item.product.id);
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.product.id);
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0">
        {item.product.image ? (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {item.product.category}
        </p>
        <p className="text-sm font-medium text-primary-600">
          ${item.product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecreaseQuantity}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          title="Disminuir cantidad"
        >
          <Minus size={16} className="text-gray-600" />
        </button>
        
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={handleIncreaseQuantity}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          title="Aumentar cantidad"
        >
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemoveItem}
        className="p-1 text-red-400 hover:text-red-600 transition-colors"
        title="Eliminar del carrito"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
