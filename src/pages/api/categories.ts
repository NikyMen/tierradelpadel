import type { APIRoute } from 'astro';
import { db } from '../../lib/database';
import type { Category } from '../../types';

// GET - Obtener todas las categorías
export const GET: APIRoute = async () => {
  try {
    const categories = await db.categories.getAll();

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener categorías' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// POST - Crear nueva categoría
export const POST: APIRoute = async ({ request }) => {
  try {
    const categoryData = await request.json();

    // Validar datos requeridos
    if (!categoryData.name || !categoryData.slug) {
      return new Response(JSON.stringify({ error: 'El nombre y slug son requeridos' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const newCategory = await db.categories.create(categoryData);

    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return new Response(JSON.stringify({ error: 'Error al crear la categoría' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};