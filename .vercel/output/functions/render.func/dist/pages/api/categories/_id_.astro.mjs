import { d as db } from '../../../chunks/database_Dq_K0OaJ.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "ID de categoría no proporcionado" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const category = await db.categories.getById(id);
    if (!category) {
      return new Response(JSON.stringify({ error: "Categoría no encontrada" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify(category), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${params.id}:`, error);
    return new Response(JSON.stringify({ error: "Error al obtener la categoría" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const PUT = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "ID de categoría no proporcionado" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const categoryData = await request.json();
    if (categoryData.name) {
      const updatedCategory = await db.categories.update(id, categoryData);
      if (!updatedCategory) {
        return new Response(JSON.stringify({ error: "Categoría no encontrada" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      return new Response(JSON.stringify(updatedCategory), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({ error: "No se proporcionaron datos para actualizar" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(`Error al actualizar categoría con ID ${params.id}:`, error);
    return new Response(JSON.stringify({ error: "Error al actualizar la categoría" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const DELETE = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "ID de categoría no proporcionado" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const deletedCategory = await db.categories.delete(id);
    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: "Categoría no encontrada" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({ message: "Categoría eliminada correctamente" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(`Error al eliminar categoría con ID ${params.id}:`, error);
    return new Response(JSON.stringify({ error: "Error al eliminar la categoría" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
