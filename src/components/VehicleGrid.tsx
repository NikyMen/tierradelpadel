import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import type { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {vehicle.image && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {vehicle.name}
          </h3>
          <span className="text-sm font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
            {vehicle.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {vehicle.description}
        </p>
        
        <div className="space-y-2 mb-4">
          {vehicle.brand && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Marca:</span>
              <span className="text-gray-900 font-medium">{vehicle.brand}</span>
            </div>
          )}
          {vehicle.model && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Modelo:</span>
              <span className="text-gray-900 font-medium">{vehicle.model}</span>
            </div>
          )}
          {vehicle.year && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Año:</span>
              <span className="text-gray-900 font-medium">{vehicle.year}</span>
            </div>
          )}
          {vehicle.mileage !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Kilometraje:</span>
              <span className="text-gray-900 font-medium">{vehicle.mileage.toLocaleString()} km</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${vehicle.price.toFixed(2)}
          </span>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            vehicle.stock === 'en-stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {vehicle.stock === 'en-stock' ? 'Disponible' : 'Agotado'}
          </span>
        </div>

        <button
          onClick={() => window.open(`https://wa.me/543794406509?text=Hola! Me gustaría consultar sobre el vehículo ${vehicle.name} (${vehicle.brand} ${vehicle.model} ${vehicle.year}).`, '_blank')}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span>Consultar por WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

interface VehicleGridProps {
  onCartUpdate?: () => void;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({ onCartUpdate }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles');
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error al cargar vehículos:', error);
      }
    };
    
    loadVehicles();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Vehículos</h2>
        <p className="text-gray-600">Descubre nuestra selección de vehículos de calidad</p>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Car className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No hay vehículos disponibles
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Los vehículos aparecerán aquí cuando estén disponibles.
          </p>
        </div>
      )}
    </div>
  );
};
