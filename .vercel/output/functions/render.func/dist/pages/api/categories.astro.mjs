import { d as db } from '../../chunks/database_Dq_K0OaJ.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const categories = await db.categories.getAll();
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return new Response(JSON.stringify({ error: "Error al obtener categorías" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const categoryData = await request.json();
    if (!categoryData.name || !categoryData.slug) {
      return new Response(JSON.stringify({ error: "El nombre y slug son requeridos" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const newCategory = await db.categories.create(categoryData);
    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return new Response(JSON.stringify({ error: "Error al crear la categoría" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
