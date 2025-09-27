import { c as createComponent, b as createAstro, d as addAttribute, e as renderHead, f as renderSlot, r as renderComponent, a as renderTemplate } from './astro/server_CFb2y3vC.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const handleWhatsAppClick = () => {
    const phoneNumber = "543794406509";
    const message = encodeURIComponent("Hola! Me gustaría consultar sobre el stock de algunos productos.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "LC Imports" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm", children: "Tu tienda online de confianza. Productos de calidad con los mejores precios." }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.instagram.com/lc_imports_ctes/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-gray-400 hover:text-white transition-colors",
            "aria-label": "Instagram",
            children: /* @__PURE__ */ jsx(Instagram, { size: 20 })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Enlaces Rápidos" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-gray-300 hover:text-white transition-colors", children: "Inicio" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#productos", className: "text-gray-300 hover:text-white transition-colors", children: "Productos" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Contacto" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "+54 379 440-6509" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Mail, { size: 16, className: "text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "info@lcimports.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 16, className: "text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Argentina, Corrientes" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "¿Consultas sobre Stock?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm", children: "Contáctanos por WhatsApp para consultar disponibilidad de productos." }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleWhatsAppClick,
            className: "inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Consultar Stock" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-800 mt-8 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
        "© ",
        currentYear,
        " LC Imports. Todos los derechos reservados."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mt-2 md:mt-0", children: [
        "Desarrollado por ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://nicolasmendez.vercel.app/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary-500 hover:text-primary-400 transition-colors font-medium",
            children: "Nicolas Mendez"
          }
        )
      ] })
    ] }) })
  ] }) });
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "LC Imports - Tu tienda online de confianza" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-gray-50"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Footer", "client:component-export": "Footer" })} <div id="notification-container"></div> </body></html>`;
}, "C:/Users/nikom/Dev/ecommerce-lcimports/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
