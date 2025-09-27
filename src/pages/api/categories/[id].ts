import type { APIRoute } from 'astro';
import { db } from '../../../lib/database';
import type { Category } from '../../../types';

// GET - Obtener categoría por ID
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de categoría no proporcionado' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const category = await db.categories.getById(id);

    if (!category) {
      return new Response(JSON.stringify({ error: 'Categoría no encontrada' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(category), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${params.id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al obtener la categoría' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// PUT - Actualizar categoría por ID
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de categoría no proporcionado' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const categoryData: Partial<Category> = await request.json();

    // Por ahora, solo permitimos actualizar el nombre
    if (categoryData.name) {
      const updatedCategory = await db.categories.update(id, categoryData);

      if (!updatedCategory) {
        return new Response(JSON.stringify({ error: 'Categoría no encontrada' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      return new Response(JSON.stringify(updatedCategory), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'No se proporcionaron datos para actualizar' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error al actualizar categoría con ID ${params.id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al actualizar la categoría' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// DELETE - Eliminar categoría por ID
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de categoría no proporcionado' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const deletedCategory = await db.categories.delete(id);

    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: 'Categoría no encontrada' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ message: 'Categoría eliminada correctamente' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error al eliminar categoría con ID ${params.id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al eliminar la categoría' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
