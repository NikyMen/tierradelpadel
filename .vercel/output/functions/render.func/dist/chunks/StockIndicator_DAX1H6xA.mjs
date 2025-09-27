import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';

const StockIndicator = ({ stock, className = "" }) => {
  const getStockStatus = (stock2) => {
    switch (stock2) {
      case "sin-stock":
        return {
          color: "bg-red-500",
          text: "Sin Stock",
          textColor: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200"
        };
      case "stock-bajo":
        return {
          color: "bg-yellow-500",
          text: "Stock Bajo",
          textColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200"
        };
      case "en-stock":
        return {
          color: "bg-green-500",
          text: "En Stock",
          textColor: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        };
      default:
        return {
          color: "bg-gray-500",
          text: "Desconocido",
          textColor: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200"
        };
    }
  };
  const status = getStockStatus(stock);
  return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center space-x-2 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${status.color} animate-pulse` }),
      /* @__PURE__ */ jsx("div", { className: `absolute inset-0 w-3 h-3 rounded-full ${status.color} opacity-30 animate-ping` })
    ] }),
    /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${status.textColor}`, children: status.text }),
    stock !== "sin-stock" && /* @__PURE__ */ jsx("span", { className: `text-xs ${status.textColor} opacity-75`, children: stock === "en-stock" ? "(Disponible)" : "(Últimas unidades)" })
  ] });
};
const StockIndicatorCompact = ({ stock, className = "" }) => {
  const getStockStatus = (stock2) => {
    switch (stock2) {
      case "sin-stock":
        return "bg-red-500";
      case "stock-bajo":
        return "bg-yellow-500";
      case "en-stock":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  const status = getStockStatus(stock);
  return /* @__PURE__ */ jsx("div", { className: `inline-flex items-center ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: `w-2.5 h-2.5 rounded-full ${status} animate-pulse` }),
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 w-2.5 h-2.5 rounded-full ${status} opacity-30 animate-ping` })
  ] }) });
};

export { StockIndicator as S, StockIndicatorCompact as a };
