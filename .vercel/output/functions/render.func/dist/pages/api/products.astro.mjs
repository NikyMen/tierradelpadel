import { d as db } from '../../chunks/database_Dq_K0OaJ.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const searchParams = url.searchParams;
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    let products;
    if (search) {
      products = await db.products.search(search);
    } else if (category) {
      products = await db.products.getByCategory(category);
    } else {
      products = await db.products.getAll();
    }
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return new Response(JSON.stringify({ error: "Error al obtener productos" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const productData = await request.json();
    if (!productData.name || !productData.price || !productData.category) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const newProduct = await db.products.create(productData);
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return new Response(JSON.stringify({ error: "Error al crear producto" }), {
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
