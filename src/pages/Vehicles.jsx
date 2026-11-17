import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bike, Search, Info } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import PageHeader from '../components/PageHeader';
import VehicleCard from '../components/VehicleCard';
import EnquiryCTA from '../components/EnquiryCTA';
import SEOHead from '../components/SEOHead';
import { VEHICLES, VEHICLE_CATEGORIES } from '../data/vehicles';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';

export default function Vehicles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (catId) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', catId);
    }
    setSearchParams(nextParams);
  };

  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory;
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCustomEnquiry = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <SEOHead 
        title="TVS Vehicles Catalogue | Shankar Automobiles – Sitapur, Surguja"
        description="Explore the complete TVS lineup at Shankar Automobiles Sitapur: Apache RR 310, RTR 310, RTR 160 4V, Raider 125, Ronin, Jupiter 110, Ntorq 125, and iQube EV. Check specs and request on-road quotes."
      />

      <PageHeader
        badge="Official TVS Lineup"
        title="TVS Two-Wheeler Catalogue"
        subtitle="Explore specifications, performance figures, and colorways for TVS motorcycles, scooters, and electric vehicles."
        breadcrumb="Vehicles"
      />

      {/* Catalogue & Filter Section */}
      <section className="py-12 sm:py-16 bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Information & Disclaimer Banner */}
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#121722] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 text-xs text-gray-300">
              <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block sm:inline">Official TVS Catalogue & Dealership Stock Notice: </strong>
                All listed vehicles are part of the official TVS Motor lineup. Color options, specific trim variants, and ready stock may vary at our Sitapur showroom. Contact our sales team for exact real-time availability.
              </div>
            </div>
            <button
              type="button"
              onClick={handleCustomEnquiry}
              className="shrink-0 flex items-center space-x-1.5 px-4 py-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] rounded-xl text-xs font-bold transition group"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>Check Live Stock on WhatsApp</span>
            </button>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {VEHICLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                      : 'bg-[#121722] text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Apache, Jupiter, Raider..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-14 py-2 bg-[#121722] border border-white/10 rounded-xl text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Results Count & Feedback */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
            <span>
              Showing <strong className="text-white">{filteredVehicles.length}</strong> {filteredVehicles.length === 1 ? 'model' : 'models'}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <span className="hidden sm:inline italic">
              Click "Details" to view technical specs & color options
            </span>
          </div>

          {/* Vehicles Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center rounded-3xl bg-[#111622] border border-white/10 space-y-4">
              <Bike className="w-12 h-12 text-gray-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No models found</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                We couldn't find any TVS vehicle matching your filter criteria. Try resetting the search or category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      <EnquiryCTA
        title="Can't Decide Which TVS Model Fits Your Daily Commute?"
        subtitle="Our TVS specialists at Shankar Automobiles Sitapur are here to guide you through fuel economy, power output, seat comfort, and financing calculations."
      />
    </div>
  );
}
