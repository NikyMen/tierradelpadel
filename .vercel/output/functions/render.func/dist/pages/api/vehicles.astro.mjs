import { d as db } from '../../chunks/database_Br15SHDT.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const category = url.searchParams.get("category");
    if (category) {
      const vehicles2 = await db.vehicles.getByCategory(category);
      return new Response(JSON.stringify(vehicles2), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const vehicles = await db.vehicles.getAll();
    return new Response(JSON.stringify(vehicles), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const vehicleData = await request.json();
    const vehicle = await db.vehicles.create(vehicleData);
    return new Response(JSON.stringify(vehicle), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
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
