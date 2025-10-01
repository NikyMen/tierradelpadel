import React, { useState } from 'react';
import { X, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { CartItem } from './CartItem';
import { formatWhatsAppMessage, openWhatsApp } from '../../lib/whatsapp';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, total, clearCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  const handleWhatsAppConsultation = () => {
    const message = formatWhatsAppMessage(items, total);
    openWhatsApp(message);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={20} />
              <h2 className="text-lg font-semibold">
                Carrito ({totalItems})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Tu carrito está vacío</p>
                <p className="text-sm mt-2">Agrega productos para poder consultar por WhatsApp</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>
                  Total:
                </span>
                <span className="text-xl font-bold text-primary-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* WhatsApp Consultation Button */}
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle size={20} />
                <span>Consultar por WhatsApp</span>
              </button>

              <div className="text-xs text-gray-500 text-center">
                Se abrirá WhatsApp con tu consulta lista para enviar
              </div>

              {/* Clear Cart Button */}
              <button
                onClick={handleClearCart}
                className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
