import type { APIRoute } from 'astro';
import type { WhatsAppMessage } from '../../types';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { products, total, customerInfo }: WhatsAppMessage = await request.json();
    
    if (!products || products.length === 0) {
      return new Response(JSON.stringify({ error: 'No hay productos en el carrito' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Crear mensaje para WhatsApp
    let message = `🛒 *Consulta de Stock - LC Imports*\n\n`;
    message += `📋 *Productos en el carrito:*\n\n`;
    
    products.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   📦 Cantidad: ${item.quantity}\n`;
      message += `   💰 Precio unitario: $${item.product.price}\n`;
      message += `   💵 Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n`;
      message += `   📝 Descripción: ${item.product.description}\n\n`;
    });
    
    message += `💰 *Total del carrito: $${total.toFixed(2)}*\n\n`;
    
    if (customerInfo?.name) {
      message += `👤 *Cliente:* ${customerInfo.name}\n`;
    }
    if (customerInfo?.phone) {
      message += `📱 *Teléfono:* ${customerInfo.phone}\n`;
    }
    
    message += `\n⏰ *Fecha:* ${new Date().toLocaleString('es-ES')}\n`;
    message += `\n_Por favor, confirma la disponibilidad de stock para estos productos._`;
    
    // Número de WhatsApp (reemplaza con tu número)
    const whatsappNumber = '5491234567890'; // Formato internacional sin +
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Mensaje preparado para WhatsApp',
      whatsappUrl,
      messageText: message
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al procesar consulta de WhatsApp' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
