import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, Heart, Share2, Phone, MessageCircle, Camera, Tag } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewTickets: (propertyId: string) => void;
  onContactAgent: (phone: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewTickets, onContactAgent }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Under Offer':
        return 'bg-orange-100 text-orange-800';
      case 'Sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                →
              </button>
            </>
          )}

          {/* Image Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Overlay Elements */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
          {property.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-all ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white bg-opacity-80 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 bg-white bg-opacity-80 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-all">
            <Share2 size={16} />
          </button>
        </div>

        <div className="absolute bottom-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{property.title}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </div>
            <div className="text-sm text-gray-500">
              ${property.psf}/sqft
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1 text-blue-500" />
          <span className="text-sm">{property.location.address}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Bed size={16} className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath size={16} className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square size={16} className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">{property.sqft} sqft</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-blue-600 text-xs font-medium">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {property.agent.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{property.agent}</div>
                <div className="text-xs text-gray-500">Property Agent</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {property.tenure}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onContactAgent(property.agentPhone)}
              className="flex items-center justify-center bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <MessageCircle size={14} className="mr-1" />
              WhatsApp
            </button>
            <button
              onClick={() => onContactAgent(property.agentPhone)}
              className="flex items-center justify-center border-2 border-blue-600 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
            >
              <Phone size={14} className="mr-1" />
              Call
            </button>
            <button
              onClick={() => onViewTickets(property.id)}
              className="flex items-center justify-center border-2 border-gray-300 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              <Tag size={14} className="mr-1" />
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;