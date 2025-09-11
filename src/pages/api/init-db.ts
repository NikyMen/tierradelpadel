import type { APIRoute } from 'astro';
import { initDatabase } from '../../lib/database';

export const POST: APIRoute = async () => {
  try {
    await initDatabase();
    return new Response(JSON.stringify({ 
      message: 'Base de datos inicializada correctamente',
      success: true 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    return new Response(JSON.stringify({ 
      error: 'Error al inicializar la base de datos',
      details: error instanceof Error ? error.message : 'Error desconocido',
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ 
    message: 'Para inicializar la base de datos, haz una petición POST a este endpoint',
    endpoint: '/api/init-db',
    method: 'POST'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
