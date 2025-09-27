import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();

    // Obtener credenciales desde variables de entorno
    const adminUsername = import.meta.env.ADMIN_USERNAME || 'admin';
    const adminPassword = import.meta.env.ADMIN_PASSWORD || 'admin123';

    // Validar credenciales
    if (username === adminUsername && password === adminPassword) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Credenciales válidas' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Credenciales incorrectas' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error en el servidor' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
