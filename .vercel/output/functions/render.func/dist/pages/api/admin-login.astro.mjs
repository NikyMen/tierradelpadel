export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    const adminUsername = "lucas";
    const adminPassword = "Motomipasion1";
    if (username === adminUsername && password === adminPassword) {
      return new Response(JSON.stringify({
        success: true,
        message: "Credenciales válidas"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        message: "Credenciales incorrectas"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "Error en el servidor"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
