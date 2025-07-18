import React, { useState } from 'react';
import { Grid, Map, Filter, SlidersHorizontal } from 'lucide-react';
import { Property, SearchFilters } from '../types';
import PropertyCard from './PropertyCard';
import PropertyMap from './PropertyMap';

interface PropertiesSectionProps {
  properties: Property[];
  onViewTickets: (propertyId: string) => void;
  onContactAgent: (phone: string) => void;
  searchFilters?: SearchFilters;
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({ 
  properties, 
  onViewTickets, 
  onContactAgent,
  searchFilters 
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: '',
    status: '',
  });

  // Filter and sort properties
  const filteredProperties = properties.filter(property => {
    const matchesPrice = (!filters.priceMin || property.price >= parseInt(filters.priceMin)) &&
                        (!filters.priceMax || property.price <= parseInt(filters.priceMax));
    const matchesBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
    const matchesType = !filters.propertyType || property.type === filters.propertyType;
    const matchesStatus = !filters.status || property.status === filters.status;
    
    return matchesPrice && matchesBedrooms && matchesType && matchesStatus;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const featuredProperties = sortedProperties.filter(p => p.featured);
  const regularProperties = sortedProperties.filter(p => !p.featured);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {searchFilters ? 'Search Results' : 'Featured Properties'}
            </h2>
            <p className="text-gray-600">
              {sortedProperties.length} properties found
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid size={16} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Map size={16} />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                  placeholder="10000000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="Condominium">Condominium</option>
                  <option value="HDB">HDB</option>
                  <option value="Landed">Landed</option>
                  <option value="Shophouse">Shophouse</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Under Offer">Under Offer</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="space-y-12">
            {/* Featured Properties */}
            {featuredProperties.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {featuredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewTickets={onViewTickets}
                      onContactAgent={onContactAgent}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Properties */}
            {regularProperties.length > 0 && (
              <div>
                {featuredProperties.length > 0 && (
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">All Properties</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {regularProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewTickets={onViewTickets}
                      onContactAgent={onContactAgent}
                    />
                  ))}
                </div>
              </div>
            )}

            {sortedProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        ) : (
          <PropertyMap 
            properties={sortedProperties} 
            selectedProperty={selectedProperty}
            onPropertySelect={setSelectedProperty}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;