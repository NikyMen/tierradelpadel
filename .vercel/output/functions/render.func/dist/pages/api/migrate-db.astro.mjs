import { i as initDatabase } from '../../chunks/database_Br15SHDT.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async () => {
  try {
    await initDatabase();
    return new Response(JSON.stringify({
      success: true,
      message: "Base de datos migrada correctamente"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error migrating database:", error);
    return new Response(JSON.stringify({
      error: "Error al migrar la base de datos",
      details: error instanceof Error ? error.message : "Error desconocido"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
