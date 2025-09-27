import React from 'react';
import { ShoppingBag, Truck, Shield, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div 
      className="relative text-white min-h-[608px] flex items-center"
      style={{
        backgroundImage: 'url(/backgroundLcimports.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Bienvenido a LC Imports
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
            Descubre productos de calidad con los mejores precios
          </p>
          <div className="flex justify-center">
            <a
              href="#productos"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <ShoppingBag size={20} />
              <span>Ver Productos</span>
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative py-12">
        {/* Fondo semitransparente con bordes */}
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                Envío Rápido
              </h3>
              <p className="text-white text-opacity-90 drop-shadow-sm">
                Recibe tus productos en tiempo récord con nuestro servicio de envío express
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                Productos Garantizados
              </h3>
              <p className="text-white text-opacity-90 drop-shadow-sm">
                Todos nuestros productos cuentan con garantía de calidad y satisfacción
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                Atención Premium
              </h3>
              <p className="text-white text-opacity-90 drop-shadow-sm">
                Nuestro equipo está disponible para brindarte la mejor experiencia de compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
