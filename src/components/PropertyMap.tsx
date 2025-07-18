import React, { useEffect, useRef } from 'react';
import { Property } from '../types';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect?: (property: Property) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, selectedProperty, onPropertySelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 1.3521, lng: 103.8198 },
      zoom: 11,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e3f2fd' }],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    mapInstanceRef.current = map;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add markers for properties
    properties.forEach((property) => {
      const marker = new google.maps.Marker({
        position: { lat: property.location.lat, lng: property.location.lng },
        map: map,
        title: property.title,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.95 0 0 8.95 0 20C0 35 20 50 20 50S40 35 40 20C40 8.95 31.05 0 20 0Z" fill="${property.featured ? '#f59e0b' : '#2563eb'}"/>
              <circle cx="20" cy="20" r="8" fill="white"/>
              <text x="20" y="25" text-anchor="middle" fill="${property.featured ? '#f59e0b' : '#2563eb'}" font-size="10" font-weight="bold">$</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 50),
          anchor: new google.maps.Point(20, 50),
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3 max-w-xs">
            <img src="${property.images[0]}" alt="${property.title}" class="w-full h-32 object-cover rounded-lg mb-2">
            <h3 class="font-bold text-lg mb-1">${property.title}</h3>
            <p class="text-gray-600 text-sm mb-2">${property.location.address}</p>
            <div class="flex justify-between items-center mb-2">
              <span class="text-blue-600 font-bold text-lg">${formatPrice(property.price)}</span>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">${property.type}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-3">
              <span>${property.bedrooms} bed</span>
              <span>${property.bathrooms} bath</span>
              <span>${property.sqft} sqft</span>
            </div>
            <button onclick="window.selectProperty('${property.id}')" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        `,
      });

      marker.addListener('click', () => {
        // Close all other info windows
        markersRef.current.forEach(m => {
          if (m !== marker && (m as any).infoWindow) {
            (m as any).infoWindow.close();
          }
        });
        
        infoWindow.open(map, marker);
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });

      (marker as any).infoWindow = infoWindow;
      markersRef.current.push(marker);
    });

    // Global function for property selection from info window
    (window as any).selectProperty = (propertyId: string) => {
      const property = properties.find(p => p.id === propertyId);
      if (property && onPropertySelect) {
        onPropertySelect(property);
      }
    };

    // Center on selected property if provided
    if (selectedProperty) {
      map.setCenter({
        lat: selectedProperty.location.lat,
        lng: selectedProperty.location.lng,
      });
      map.setZoom(15);
      
      // Find and open the info window for selected property
      const selectedMarker = markersRef.current.find((marker, index) => 
        properties[index].id === selectedProperty.id
      );
      if (selectedMarker && (selectedMarker as any).infoWindow) {
        (selectedMarker as any).infoWindow.open(map, selectedMarker);
      }
    }

    return () => {
      // Cleanup
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      delete (window as any).selectProperty;
    };
  }, [properties, selectedProperty, onPropertySelect]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Property Locations</h3>
        <p className="text-sm text-gray-600">
          {properties.length} properties • Click markers for details
        </p>
      </div>
      <div ref={mapRef} className="w-full h-96"></div>
      {!window.google && (
        <div className="p-4 bg-yellow-50 text-center text-sm text-yellow-800">
          <p className="font-medium">Google Maps Integration</p>
          <p>Add your Google Maps API key to enable interactive maps</p>
          <p className="text-xs mt-1">
            Get your API key at: <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;