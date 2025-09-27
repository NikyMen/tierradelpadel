/* empty css                                 */
import { c as createComponent, g as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_5cKZDbdZ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_B8ZWhLiw.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { ShoppingCart, Package, Minus, Plus, Trash2, X, MessageCircle, User, Phone, Menu, Settings, ShoppingBag, Truck, Shield, Star, CheckCircle, ChevronLeft, ChevronRight, Search, Filter, Loader2 } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export { renderers } from '../renderers.mjs';

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
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
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
  const { items, total, clearCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
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
            totalItems,
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
            onClick: () => setShowWhatsAppForm(true),
            className: "w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Consultar Stock por WhatsApp" })
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
          /* @__PURE__ */ jsx(Package, { className: "h-8 w-8 text-primary-600" }),
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

const Hero = () => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative text-white min-h-[608px] flex items-center",
      style: {
        backgroundImage: "url(/backgroundLcimports.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black bg-opacity-40" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg", children: "Bienvenido a LC Imports" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8 text-white drop-shadow-md", children: "Descubre productos de calidad con los mejores precios" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#productos",
              className: "inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg",
              children: [
                /* @__PURE__ */ jsx(ShoppingBag, { size: 20 }),
                /* @__PURE__ */ jsx("span", { children: "Ver Productos" })
              ]
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative py-12", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-30" }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30", children: /* @__PURE__ */ jsx(Truck, { className: "h-8 w-8 text-white" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2 drop-shadow-md", children: "Envío Rápido" }),
              /* @__PURE__ */ jsx("p", { className: "text-white text-opacity-90 drop-shadow-sm", children: "Recibe tus productos en tiempo récord con nuestro servicio de envío express" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30", children: /* @__PURE__ */ jsx(Shield, { className: "h-8 w-8 text-white" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2 drop-shadow-md", children: "Productos Garantizados" }),
              /* @__PURE__ */ jsx("p", { className: "text-white text-opacity-90 drop-shadow-sm", children: "Todos nuestros productos cuentan con garantía de calidad y satisfacción" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30", children: /* @__PURE__ */ jsx(Star, { className: "h-8 w-8 text-white" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2 drop-shadow-md", children: "Atención Premium" }),
              /* @__PURE__ */ jsx("p", { className: "text-white text-opacity-90 drop-shadow-sm", children: "Nuestro equipo está disponible para brindarte la mejor experiencia de compra" })
            ] })
          ] }) })
        ] })
      ]
    }
  );
};

const useNotification = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
    isVisible: false
  });
  const showNotification = useCallback((message, type = "info") => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  }, []);
  const hideNotification = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      isVisible: false
    }));
  }, []);
  const showSuccess = useCallback((message) => {
    showNotification(message, "success");
  }, [showNotification]);
  const showError = useCallback((message) => {
    showNotification(message, "error");
  }, [showNotification]);
  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError
  };
};

const Notification = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3e3
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);
  if (!isVisible) return null;
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };
  const getIcon = () => {
    switch (type) {
      case "success":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-green-600" });
      case "error":
        return /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-red-600" });
      case "info":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-blue-600" });
      default:
        return /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-gray-600" });
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed top-4 right-4 z-50 max-w-sm w-full bg-white border rounded-lg shadow-lg transition-all duration-300 ${isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
      children: /* @__PURE__ */ jsx("div", { className: `p-4 border-l-4 ${getTypeStyles()}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: getIcon() }),
        /* @__PURE__ */ jsx("div", { className: "ml-3 flex-1", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: message }) }),
        /* @__PURE__ */ jsx("div", { className: "ml-4 flex-shrink-0", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        ) })
      ] }) })
    }
  );
};

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { notification, showSuccess, hideNotification } = useNotification();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleAddToCart = () => {
    addItem(product, 1);
    showSuccess(`${product.name} se añadió correctamente al carrito`);
  };
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Sin stock", color: "text-red-600 bg-red-100" };
    if (stock < 10) return { text: "Poco stock", color: "text-yellow-600 bg-yellow-100" };
    return { text: "En stock", color: "text-green-600 bg-green-100" };
  };
  const stockStatus = getStockStatus(product.stock);
  const allImages = [product.image, ...product.images || []].filter(Boolean);
  const currentImage = allImages[currentImageIndex] || product.image;
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        currentImage ? /* @__PURE__ */ jsx(
          "img",
          {
            src: currentImage,
            alt: product.name,
            className: "w-full h-48 object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-48 bg-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsx(Package, { className: "h-16 w-16 text-gray-400" }) }),
        allImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prevImage,
              className: "absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-opacity",
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: nextImage,
              className: "absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-opacity",
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1", children: allImages.map((_, index) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentImageIndex(index),
              className: `w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"}`
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`, children: stockStatus.text }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800", children: product.category }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2 line-clamp-2", children: product.name }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-3 line-clamp-3", children: product.description }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-yellow-400 fill-current" }),
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-yellow-400 fill-current" }),
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-yellow-400 fill-current" }),
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-yellow-400 fill-current" }),
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-gray-300" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 ml-1", children: "(4.0)" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
            "Stock: ",
            product.stock
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary-600", children: [
            "$",
            product.price.toFixed(2)
          ] }) }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleAddToCart,
              disabled: product.stock === 0,
              className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${product.stock === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary-600 text-white hover:bg-primary-700"}`,
              children: [
                /* @__PURE__ */ jsx(ShoppingCart, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: product.stock === 0 ? "Sin stock" : "Agregar" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Notification,
      {
        message: notification.message,
        type: notification.type,
        isVisible: notification.isVisible,
        onClose: hideNotification
      }
    )
  ] });
};

const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  showFilters,
  onToggleFilters
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-4 mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 text-gray-400" }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Buscar productos...",
            value: searchQuery,
            onChange: (e) => onSearchChange(e.target.value),
            className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onToggleFilters,
          className: `flex items-center space-x-2 px-4 py-2 border rounded-md transition-colors ${showFilters ? "bg-primary-600 text-white border-primary-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
          children: [
            /* @__PURE__ */ jsx(Filter, { size: 16 }),
            /* @__PURE__ */ jsx("span", { children: "Filtros" })
          ]
        }
      )
    ] }),
    showFilters && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onCategoryChange(null),
          className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === null ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: "Todas las categorías"
        }
      ),
      categories.map((category) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onCategoryChange(category),
          className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: category
        },
        category
      ))
    ] }) })
  ] });
};

const ProductGrid = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.map((cat) => cat.name));
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    return filtered;
  }, [products, debouncedSearchQuery, selectedCategory]);
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);
  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);
  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory(null);
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Cargando productos..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsx(
      SearchBar,
      {
        searchQuery,
        onSearchChange: handleSearchChange,
        selectedCategory,
        onCategoryChange: handleCategoryChange,
        categories,
        showFilters,
        onToggleFilters: handleToggleFilters
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: filteredProducts.length === 0 ? "No se encontraron productos" : `Mostrando ${filteredProducts.length} de ${products.length} productos` }),
      (searchQuery || selectedCategory) && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
        searchQuery && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800", children: [
          'Búsqueda: "',
          searchQuery,
          '"',
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSearchQuery(""),
              className: "ml-1 text-primary-600 hover:text-primary-800",
              children: /* @__PURE__ */ jsx(X, { size: 12 })
            }
          )
        ] }),
        selectedCategory && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800", children: [
          "Categoría: ",
          selectedCategory,
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedCategory(null),
              className: "ml-1 text-primary-600 hover:text-primary-800",
              children: /* @__PURE__ */ jsx(X, { size: 12 })
            }
          )
        ] })
      ] })
    ] }),
    filteredProducts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map((product) => /* @__PURE__ */ jsx(
      ProductCard,
      {
        product
      },
      product.id
    )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(Package, { className: "mx-auto h-12 w-12 text-gray-400" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: searchQuery || selectedCategory ? "No se encontraron productos" : "No hay productos disponibles" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: searchQuery || selectedCategory ? "Intenta con otros términos de búsqueda o filtros diferentes." : "Los productos aparecerán aquí cuando estén disponibles." }),
      (searchQuery || selectedCategory) && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleClearFilters,
          className: "mt-4 text-primary-600 hover:text-primary-500 text-sm font-medium",
          children: "Limpiar filtros"
        }
      )
    ] })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "LC Imports - Tu tienda online de confianza" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Header", "client:component-export": "Header" })} ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Hero", "client:component-export": "Hero" })} ${maybeRenderHead()}<main> <section id="productos"> ${renderComponent($$result2, "ProductGrid", ProductGrid, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nikom/Dev/ecommerce-lcimports/src/components/ProductGrid", "client:component-export": "ProductGrid" })} </section> </main> ` })}`;
}, "C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/index.astro", void 0);

const $$file = "C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
