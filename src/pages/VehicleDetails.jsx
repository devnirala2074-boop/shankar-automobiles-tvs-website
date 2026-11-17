import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bike, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Info
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import VehicleCard from '../components/VehicleCard';
import SEOHead from '../components/SEOHead';
import { VEHICLES } from '../data/vehicles';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, getVehicleEnquiryMessage } from '../utils/whatsapp';

const FALLBACK_VEHICLE_IMAGE =
  'https://www.tvsmotor.com/assets/img/brands/apche-rr310/agility-bg.webp';

export default function VehicleDetails() {
  const { slug } = useParams();
  const { openTestRide, openEnquiry } = useModal();

  const vehicle = VEHICLES.find((v) => v.slug === slug);

  // Scoped state keyed by slug so navigating between related vehicles resets immediately without cascading effect renders
  const [selection, setSelection] = useState({
    slug: '',
    image: null,
    color: null,
  });

  if (!vehicle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-5 bg-[#0A0D14]">
        <SEOHead title="Vehicle Not Found | Shankar Automobiles" />
        <div className="w-16 h-16 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center">
          <Bike className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-white">Vehicle Model Not Found</h1>
        <p className="text-gray-400 max-w-md text-sm">
          The TVS vehicle you are looking for might have been updated or moved. Explore our complete lineup below.
        </p>
        <Link
          to="/vehicles"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to TVS Catalogue</span>
        </Link>
      </div>
    );
  }

  const activeImage =
    selection.slug === slug && selection.image ? selection.image : vehicle.heroImage;
  const selectedColor =
    selection.slug === slug && selection.color
      ? selection.color
      : vehicle.colors?.[0] || null;

  const handleSelectImage = (imgUrl) => {
    setSelection((prev) => ({
      slug,
      image: imgUrl,
      color: prev.slug === slug && prev.color ? prev.color : vehicle.colors?.[0] || null,
    }));
  };

  const handleSelectColor = (color, index) => {
    const matchingGalleryImg =
      vehicle.gallery && vehicle.gallery[index] ? vehicle.gallery[index] : activeImage;
    setSelection({
      slug,
      image: matchingGalleryImg,
      color,
    });
  };

  const isEV = vehicle.category === 'electric';

  const handleWhatsAppEnquiry = () => {
    const customNotes = selectedColor ? `Selected Color Preference: ${selectedColor.name}` : '';
    const waText = getVehicleEnquiryMessage(vehicle.name, customNotes);
    const url = buildWhatsAppUrl(waText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Related vehicles in same category
  const relatedVehicles = VEHICLES
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <SEOHead 
        title={`${vehicle.name} Price, Specs & Colours | Shankar Automobiles Sitapur`}
        description={`Explore official specifications, mileage, colors and features of ${vehicle.name} at Shankar Automobiles, authorized TVS dealer in Sitapur, Surguja. Inquire for on-road price & test ride.`}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-[#090C12] border-b border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-500 shrink-0" />
          <Link to="/vehicles" className="hover:text-white transition">Vehicles</Link>
          <ChevronRight className="w-3 h-3 text-gray-500 shrink-0" />
          <Link to={`/vehicles?category=${vehicle.category}`} className="capitalize hover:text-white transition">
            {vehicle.category}s
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-500 shrink-0" />
          <span className="text-red-400 font-semibold">{vehicle.name}</span>
        </div>
      </div>

      {/* Main Vehicle Showcase */}
      <section className="py-10 sm:py-16 bg-[#0B0E15] w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full min-w-0">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full min-w-0">
            
            {/* Left Column: Image & Visual Gallery (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 min-w-0 w-full">
              
              {/* Main Stage Image */}
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_#1E293B_0%,_#111726_65%,_#0A0D14_100%)] border border-white/10 shadow-2xl">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  decoding="async"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_VEHICLE_IMAGE) {
                      e.currentTarget.src = FALLBACK_VEHICLE_IMAGE;
                    }
                  }}
                  className={`w-full h-full transition-all duration-300 ${
                    vehicle.imageFit === 'contain'
                      ? 'object-contain object-center p-6 sm:p-8 drop-shadow-[0_16px_28px_rgba(0,0,0,0.7)]'
                      : 'object-cover object-center'
                  }`}
                />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-black/70 backdrop-blur border border-white/20 text-white">
                    {vehicle.series}
                  </span>
                  {vehicle.badge && (
                    <span className={`px-3 py-1 text-xs font-extrabold uppercase rounded-lg shadow-md ${
                      isEV ? 'bg-cyan-500 text-black' : 'bg-red-600 text-white'
                    }`}>
                      {vehicle.badge}
                    </span>
                  )}
                </div>

                {/* Selected Color indicator badge */}
                {selectedColor && (
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur border border-white/15 text-xs text-white">
                    <span
                      className="w-3 h-3 rounded-full border border-white/40"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span>{selectedColor.name}</span>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {vehicle.gallery && vehicle.gallery.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {vehicle.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectImage(imgUrl)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        activeImage === imgUrl
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${vehicle.name} view ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        decoding="async"
                        onError={(e) => {
                          if (e.currentTarget.src !== FALLBACK_VEHICLE_IMAGE) {
                            e.currentTarget.src = FALLBACK_VEHICLE_IMAGE;
                          }
                        }}
                        className="w-full h-full object-contain bg-[#131926] p-1"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Color Visualizer Swatches */}
              {vehicle.colors && vehicle.colors.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#121722] border border-white/10 space-y-3">
                  <div className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Available Colorways</span>
                    <span className="text-red-400 font-semibold">{selectedColor?.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {vehicle.colors.map((color, index) => {
                      const isSelected = selectedColor?.name === color.name;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectColor(color, index)}
                          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition ${
                            isSelected
                              ? 'bg-white/10 border-red-500 text-white shadow-md'
                              : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dealership Stock Notice */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start space-x-3 text-xs text-gray-400">
                <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-300">Shankar Automobiles Stock Advisory: </strong>
                  Colorways and variants shown reflect official TVS Motor options. Contact our Sitapur team directly to check current in-stock units and delivery schedules.
                </div>
              </div>

            </div>

            {/* Right Column: Details & Primary Actions (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 min-w-0 w-full">
              
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{vehicle.series}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {vehicle.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 font-medium mt-1">
                  {vehicle.tagline}
                </p>
              </div>

              {/* Price Estimation Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#171F2D] to-[#121722] border border-white/10 space-y-2">
                <div className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                  Indicative Starting Ex-Showroom*
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {vehicle.startingPriceEstimate}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pt-1">
                  *Ex-Showroom price only. Contact Shankar Automobiles for the verified On-Road quotation in Sitapur (includes Chhattisgarh RTO registration, 5-year insurance, and road tax).
                </p>
              </div>

              {/* Quick Spec Highlights Grid (Zero Truncation) */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
                <div className="p-3.5 rounded-xl bg-[#121722] border border-white/5 space-y-1">
                  <div className="text-gray-400 text-[10px] uppercase font-semibold">
                    {isEV ? 'Battery Pack' : 'Engine'}
                  </div>
                  <div className="font-bold text-white text-xs leading-snug">
                    {vehicle.cardSpecs?.engineValue || vehicle.specs.displacement}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121722] border border-white/5 space-y-1">
                  <div className="text-gray-400 text-[10px] uppercase font-semibold">Max Power</div>
                  <div className="font-bold text-white text-xs leading-snug">
                    {vehicle.cardSpecs?.powerValue || vehicle.specs.maxPower}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121722] border border-white/5 space-y-1">
                  <div className="text-gray-400 text-[10px] uppercase font-semibold">Max Torque</div>
                  <div className="font-bold text-white text-xs leading-snug">
                    {vehicle.cardSpecs?.torqueValue || vehicle.specs.maxTorque}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121722] border border-white/5 space-y-1">
                  <div className="text-gray-400 text-[10px] uppercase font-semibold">
                    {isEV ? 'True Range' : 'Est. Mileage'}
                  </div>
                  <div className="font-bold text-white text-xs leading-snug">
                    {vehicle.specs.mileageOrRange}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full flex items-center justify-center space-x-2.5 py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/35 transition-all duration-300 transform hover:scale-[1.01] active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Enquire on WhatsApp</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => openTestRide(vehicle.name)}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-950/30 transition"
                  >
                    <Bike className="w-4 h-4 shrink-0" />
                    <span>Book Test Ride</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openEnquiry(vehicle.name)}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition"
                  >
                    <span>Request Quotation</span>
                  </button>
                </div>
              </div>

              {/* Dealership Assurance */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-xs text-gray-400">
                <div className="flex items-center space-x-2 text-gray-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Shankar Automobiles Sitapur Assurance</span>
                </div>
                <p>
                  Official TVS Manufacturer Warranty, authorized service coupon support, genuine spare parts, and spot finance options through leading banks.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Description & Key Highlights Section */}
      <section className="py-16 bg-[#090C12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Description & Highlights (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight mb-4">
                  Overview & Engineering
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>Key Features & Technology</span>
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {vehicle.keyHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#111622] border border-white/5 text-xs sm:text-sm text-gray-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Full Technical Specifications Table (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4">
                Technical Specifications
              </h2>

              <div className="rounded-2xl bg-[#111622] border border-white/10 overflow-hidden divide-y divide-white/5 text-xs">
                
                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Powertrain</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.displacement}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Max Power</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.maxPower}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Max Torque</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.maxTorque}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Top Speed</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.topSpeed}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">{isEV ? 'Range per Charge' : 'Mileage (est.)'}</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.mileageOrRange}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Transmission</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.transmission}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Braking System</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.brakes}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">{isEV ? 'Charging / Socket' : 'Fuel Tank'}</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.fuelCapacity}</span>
                </div>

                <div className="p-3.5 flex items-center justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Kerb Weight</span>
                  <span className="text-white font-medium text-right">{vehicle.specs.kerbWeight}</span>
                </div>

                {vehicle.specs.coolingSystem && (
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <span className="text-gray-400 shrink-0">Cooling System</span>
                    <span className="text-white font-medium text-right">{vehicle.specs.coolingSystem}</span>
                  </div>
                )}

              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400">
                Specifications sourced from TVS Motor official technical documentation. Actual performance metrics may vary based on riding style, load, terrain, and tyre pressure.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Related Models Section */}
      {relatedVehicles.length > 0 && (
        <section className="py-16 bg-[#0B0E15] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
                  Similar Models
                </div>
                <h3 className="text-2xl font-black text-white">
                  More in {vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1)}s
                </h3>
              </div>
              <Link
                to={`/vehicles?category=${vehicle.category}`}
                className="text-xs font-semibold text-gray-300 hover:text-red-400 transition"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <VehicleCard key={rel.id} vehicle={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Action Footer */}
      <section className="py-12 bg-[#090C12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-white">Interested in {vehicle.name}?</h4>
            <p className="text-xs text-gray-400">
              Schedule a test ride or get a breakdown of registration and insurance costs in Sitapur.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openTestRide(vehicle.name)}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition whitespace-nowrap"
            >
              Book Test Ride
            </button>
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl shadow-md shadow-[#25D366]/20 transition-all duration-200 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
