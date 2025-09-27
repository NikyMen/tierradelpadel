export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { products, total, customerInfo } = await request.json();
    if (!products || products.length === 0) {
      return new Response(JSON.stringify({ error: "No hay productos en el carrito" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    let message = `🛒 *Consulta de Stock - LC Imports*

`;
    message += `📋 *Productos en el carrito:*

`;
    products.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*
`;
      message += `   📦 Cantidad: ${item.quantity}
`;
      message += `   💰 Precio unitario: $${item.product.price}
`;
      message += `   💵 Subtotal: $${(item.product.price * item.quantity).toFixed(2)}
`;
      message += `   📝 Descripción: ${item.product.description}

`;
    });
    message += `💰 *Total del carrito: $${total.toFixed(2)}*

`;
    if (customerInfo?.name) {
      message += `👤 *Cliente:* ${customerInfo.name}
`;
    }
    if (customerInfo?.phone) {
      message += `📱 *Teléfono:* ${customerInfo.phone}
`;
    }
    message += `
⏰ *Fecha:* ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES")}
`;
    message += `
_Por favor, confirma la disponibilidad de stock para estos productos._`;
    const whatsappNumber = "5491234567890";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    return new Response(JSON.stringify({
      success: true,
      message: "Mensaje preparado para WhatsApp",
      whatsappUrl,
      messageText: message
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al procesar consulta de WhatsApp" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
