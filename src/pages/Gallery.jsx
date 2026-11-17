import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Maximize2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { GALLERY_ITEMS } from '../data/gallery';
import { DEALERSHIP } from '../data/dealership';

const FALLBACK_GALLERY_IMAGE =
  'https://www.tvsmotor.com/assets/img/brands/apche-rr310/agility-bg.webp';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);

  const filters = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'motorcycle', label: 'Motorcycles' },
    { id: 'scooter', label: 'Scooters' },
    { id: 'electric', label: 'Electric Mobility (EV)' },
  ];

  // Close lightbox on Escape key and lock body scroll while open
  useEffect(() => {
    if (!activeItem) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem]);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div>
      <SEOHead 
        title="TVS Vehicle Gallery | Shankar Automobiles – Sitapur, Surguja"
        description="Explore visual highlights of the TVS motorcycle, scooter, and electric vehicle lineup at Shankar Automobiles in Sitapur, Surguja."
      />

      <PageHeader
        badge="Visual Showcase"
        title="TVS Vehicle Gallery"
        subtitle="Explore high-definition visuals of the TVS motorcycles, scooters, and electric vehicles available at Shankar Automobiles, Sitapur."
        breadcrumb="Gallery"
      />

      {/* Gallery Section */}
      <section className="py-16 bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  activeFilter === f.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                    : 'bg-[#121722] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_#1E293B_0%,_#111726_65%,_#0A0D14_100%)] border border-white/10 cursor-pointer hover:border-red-500/50 transition duration-300 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_GALLERY_IMAGE) {
                      e.currentTarget.src = FALLBACK_GALLERY_IMAGE;
                    }
                  }}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition pointer-events-none" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 px-2 py-0.5 rounded bg-black/60 backdrop-blur inline-block">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-red-300 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dealership Visit Invite */}
          <div className="mt-16 text-center p-8 rounded-3xl bg-[#121722] border border-white/10 max-w-2xl mx-auto space-y-3">
            <h3 className="text-xl font-bold text-white">Experience It in Person</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Visit our showroom on NH-43, Sitapur, opposite Central Bank of India. Walk around the bikes, sit on them, and take your favorite TVS model for a test ride.
            </p>
            <div className="pt-2">
              <a
                href={DEALERSHIP.links.googleMapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition"
              >
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#121722] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[radial-gradient(ellipse_at_center,_#1E293B_0%,_#0A0D14_100%)]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                decoding="async"
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_GALLERY_IMAGE) {
                    e.currentTarget.src = FALLBACK_GALLERY_IMAGE;
                  }
                }}
                className="w-full h-full object-contain p-4 sm:p-6"
              />
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition border border-white/20"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#0E131C] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                  {activeItem.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeItem.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{activeItem.caption}</p>
              </div>

              <div className="text-xs text-gray-400 shrink-0">
                {DEALERSHIP.name} • Sitapur
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
