import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <section
      id="nosotros"
      className="relative min-h-[600px]"
      style={{
        backgroundImage: 'url(/background-nosotros.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex justify-end">
        <div className="bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg shadow-lg w-full md:max-w-xl p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nosotros</h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed">
            <p>
              Somos una tienda de pádel nueva en el mercado, creada con un objetivo claro: ofrecer una experiencia de compra seria, transparente y orientada a las necesidades reales del jugador. Venimos a elevar el nivel del rubro, acercando productos seleccionados, precios competitivos y una atención que prioriza el asesoramiento profesional
            </p>
            <p>
              Nos enfocamos en brindar confianza desde el primer contacto: entregas seguras, comunicación clara y un servicio personalizado para ayudarte a elegir el equipamiento ideal.
            </p>
            <p>
              Nuestro objetivo es ser una tienda de referencia dentro del pádel, combinando calidad, buen servicio y una amplia variedad de marcas líderes para que cada jugador encuentre exactamente lo que necesita.
            </p>
            <p>
              Nuestro compromiso es claro: ofrecer atención personalizada, opciones para todos los niveles y presupuestos, y precios competitivos sin comprometer la calidad. Queremos que cada cliente compre con confianza, respaldo y la tranquilidad de elegir entre las mejores marcas del mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
