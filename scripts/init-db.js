// Script para inicializar la base de datos
const initDB = async () => {
  try {
    console.log('🔄 Inicializando base de datos...');
    
    const response = await fetch('http://localhost:4321/api/init-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Base de datos inicializada correctamente');
      console.log('📦 Productos de ejemplo agregados');
      
      // Verificar que los productos se cargaron
      const productsResponse = await fetch('http://localhost:4321/api/products');
      const products = await productsResponse.json();
      console.log(`📊 Total de productos en la base de datos: ${products.length}`);
      
    } else {
      console.error('❌ Error:', result.error);
      if (result.details) {
        console.error('Detalles:', result.details);
      }
    }
  } catch (error) {
    console.error('❌ Error al conectar con la API:', error.message);
    console.log('💡 Asegúrate de que el servidor esté ejecutándose con: npm run dev');
  }
};

initDB();