import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertiesSection from './components/PropertiesSection';
import TicketManager from './components/TicketManager';
import Contact from './components/Contact';
import { Property, SearchFilters } from './types';
import { useTickets } from './hooks/useTickets';
import propertiesData from './data/properties.json';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>();
  const properties: Property[] = propertiesData as Property[];
  const { tickets, updateTicket, createTicket } = useTickets();

  const handleViewTickets = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setActiveSection('tickets');
  };

  const handleContactAgent = (phone: string) => {
    const message = encodeURIComponent("Hello! I'm interested in your property listing. Could you please provide more information?");
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    setActiveSection('properties');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onSearch={handleSearch} />;
      case 'properties':
        return (
          <PropertiesSection
            properties={properties}
            onViewTickets={handleViewTickets}
            onContactAgent={handleContactAgent}
            searchFilters={searchFilters}
          />
        );
      case 'tickets':
        return (
          <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TicketManager
                tickets={tickets}
                properties={properties}
                selectedPropertyId={selectedPropertyId}
                onUpdateTicket={updateTicket}
                onCreateTicket={createTicket}
              />
            </div>
          </div>
        );
      case 'contact':
        return <Contact />;
      default:
        return <Hero onSearch={handleSearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <h3 className="text-2xl font-bold">PropertyHub</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted partner in finding the perfect property. We provide comprehensive 
                real estate solutions with cutting-edge technology and personalized service.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    const message = encodeURIComponent("Hello! I'm interested in your property services.");
                    window.open(`https://wa.me/6591234567?text=${message}`, '_blank');
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  WhatsApp
                </button>
                <button 
                  onClick={() => window.open('https://instagram.com/propertyhub_sg', '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg transition-all"
                >
                  Instagram
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Property Sales</li>
                <li>Property Rental</li>
                <li>Property Management</li>
                <li>Investment Consultation</li>
                <li>Market Analysis</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+65 9123 4567</li>
                <li>contact@propertyhub.sg</li>
                <li>Marina Bay Financial Centre</li>
                <li>Singapore 018989</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 PropertyHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;