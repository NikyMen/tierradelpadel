import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { ShoppingCart, Package, Minus, Plus, Trash2, X, MessageCircle, User, Phone, Settings, Menu } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            const updatedItems = state.items.map(
              (item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            return { items: updatedItems, total };
          } else {
            const newItem = { product, quantity };
            const updatedItems = [...state.items, newItem];
            const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            return { items: updatedItems, total };
          }
        });
      },
      removeItem: (productId) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.product.id !== productId);
          const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: updatedItems, total };
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => {
          const updatedItems = state.items.map(
            (item) => item.product.id === productId ? { ...item, quantity } : item
          );
          const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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
      name: "cart-storage"
    }
  )
);

const CartButton = ({ onClick }) => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: "relative p-2 text-gray-600 hover:text-primary-600 transition-colors",
      title: "Ver carrito",
      children: [
        /* @__PURE__ */ jsx(ShoppingCart, { size: 24 }),
        totalItems > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium", children: totalItems > 99 ? "99+" : totalItems })
      ]
    }
  );
};

const CartItem = ({ item }) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: item.product.image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: item.product.image,
        alt: item.product.name,
        className: "h-16 w-16 rounded-lg object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsx(Package, { className: "h-8 w-8 text-gray-400" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 truncate", children: item.product.name }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 truncate", children: item.product.category }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-primary-600", children: [
        "$",
        item.product.price.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDecreaseQuantity,
          className: "p-1 rounded-full hover:bg-gray-100 transition-colors",
          title: "Disminuir cantidad",
          children: /* @__PURE__ */ jsx(Minus, { size: 16, className: "text-gray-600" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-8 text-center text-sm font-medium", children: item.quantity }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleIncreaseQuantity,
          className: "p-1 rounded-full hover:bg-gray-100 transition-colors",
          title: "Aumentar cantidad",
          children: /* @__PURE__ */ jsx(Plus, { size: 16, className: "text-gray-600" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-gray-900", children: [
      "$",
      subtotal.toFixed(2)
    ] }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleRemoveItem,
        className: "p-1 text-red-400 hover:text-red-600 transition-colors",
        title: "Eliminar del carrito",
        children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
      }
    )
  ] });
};

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, total, clearCart, getTotalItems } = useCartStore();
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleWhatsAppSubmit = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    try {
      const whatsappData = {
        products: items,
        total,
        customerInfo: customerInfo.name || customerInfo.phone ? customerInfo : void 0
      };
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(whatsappData)
      });
      const result = await response.json();
      if (response.ok) {
        window.open(result.whatsappUrl, "_blank");
        setShowWhatsAppForm(false);
        setCustomerInfo({ name: "", phone: "" });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al enviar consulta:", error);
      alert("Error al procesar la consulta. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleQuickWhatsApp = async () => {
    if (items.length === 0) return;
    try {
      const whatsappData = {
        products: items,
        total
      };
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(whatsappData)
      });
      const result = await response.json();
      if (response.ok) {
        window.open(result.whatsappUrl, "_blank");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al generar enlace de WhatsApp:", error);
      alert("Error al generar el enlace de WhatsApp");
    }
  };
  const handleClearCart = () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      clearCart();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50 z-40",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(ShoppingCart, { className: "h-6 w-6 text-primary-600" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900", children: [
            "Carrito (",
            getTotalItems(),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
            children: /* @__PURE__ */ jsx(X, { size: 20, className: "text-gray-500" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4", children: items.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((item) => /* @__PURE__ */ jsx(CartItem, { item }, item.product.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "h-16 w-16 text-gray-300 mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Tu carrito está vacío" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Agrega algunos productos para comenzar" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors",
            children: "Continuar comprando"
          }
        )
      ] }) }),
      items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 p-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-900", children: "Total:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-primary-600", children: [
            "$",
            total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleQuickWhatsApp,
            className: "w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Consultar Stock por WhatsApp" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowWhatsAppForm(true),
            className: "w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm",
            children: [
              /* @__PURE__ */ jsx(User, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "Con datos personales" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClearCart,
            className: "w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors",
            children: "Vaciar carrito"
          }
        )
      ] })
    ] }) }),
    showWhatsAppForm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Consulta de Stock" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowWhatsAppForm(false),
            className: "text-gray-400 hover:text-gray-600",
            children: /* @__PURE__ */ jsx(X, { size: 20 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Opcional: Agrega tu información para una mejor atención" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nombre" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: customerInfo.name,
                onChange: (e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value })),
                className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
                placeholder: "Tu nombre"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Teléfono" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: customerInfo.phone,
                onChange: (e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value })),
                className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
                placeholder: "Tu número de teléfono"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowWhatsAppForm(false),
              className: "flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleWhatsAppSubmit,
              disabled: isSubmitting,
              className: "flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2",
              children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }),
                /* @__PURE__ */ jsx("span", { children: "Enviando..." })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(MessageCircle, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Enviar por WhatsApp" })
              ] })
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
};

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white shadow-sm sticky top-0 z-30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/logo.png",
              alt: "LC Imports Logo",
              className: "h-8 w-8 object-contain"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-900", children: "LC Imports" })
        ] }) }),
        /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center space-x-8", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              className: "text-gray-700 hover:text-primary-600 transition-colors",
              children: "Inicio"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/#productos",
              className: "text-gray-700 hover:text-primary-600 transition-colors",
              children: "Productos"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/#vehiculos",
              className: "text-gray-700 hover:text-primary-600 transition-colors",
              children: "Vehículos"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/nosotros",
              className: "text-gray-700 hover:text-primary-600 transition-colors",
              children: "Nosotros"
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/admin",
              className: "text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1",
              children: [
                /* @__PURE__ */ jsx(Settings, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Admin" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(CartButton, { onClick: toggleCart }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleMobileMenu,
              className: "md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] })
      ] }),
      isMobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-gray-200 py-4", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col space-y-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "text-gray-700 hover:text-primary-600 transition-colors",
            onClick: () => setIsMobileMenuOpen(false),
            children: "Inicio"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/#productos",
            className: "text-gray-700 hover:text-primary-600 transition-colors",
            onClick: () => setIsMobileMenuOpen(false),
            children: "Productos"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/#vehiculos",
            className: "text-gray-700 hover:text-primary-600 transition-colors",
            onClick: () => setIsMobileMenuOpen(false),
            children: "Vehículos"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/nosotros",
            className: "text-gray-700 hover:text-primary-600 transition-colors",
            onClick: () => setIsMobileMenuOpen(false),
            children: "Nosotros"
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin",
            className: "text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-2",
            onClick: () => setIsMobileMenuOpen(false),
            children: [
              /* @__PURE__ */ jsx(Settings, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "Panel de Administración" })
            ]
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(CartSidebar, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false) })
  ] });
};

export { Header as H, useCartStore as u };
