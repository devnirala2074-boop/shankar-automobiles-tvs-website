import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Zap, Fuel, Cpu, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { TVSHorseIcon } from './TVSLogo';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, getVehicleEnquiryMessage } from '../utils/whatsapp';

const FALLBACK_VEHICLE_IMAGE =
  'https://www.tvsmotor.com/assets/img/brands/apche-rr310/agility-bg.webp';

export default function VehicleCard({ vehicle }) {
  const { openTestRide } = useModal();

  // Build candidate image list from heroImage + gallery + fallback
  const candidateImages = React.useMemo(() => {
    const list = [
      vehicle.heroImage,
      ...(vehicle.gallery || []),
      FALLBACK_VEHICLE_IMAGE,
    ].filter(Boolean);
    return [...new Set(list)];
  }, [vehicle.heroImage, vehicle.gallery]);

  const [imgState, setImgState] = useState({
    vehicleId: vehicle.id,
    index: 0,
    failed: false,
  });

  const currentIndex = imgState.vehicleId === vehicle.id ? imgState.index : 0;
  const allFailed = imgState.vehicleId === vehicle.id ? imgState.failed : false;

  const handleImageError = () => {
    if (currentIndex < candidateImages.length - 1) {
      setImgState({
        vehicleId: vehicle.id,
        index: currentIndex + 1,
        failed: false,
      });
    } else {
      setImgState({
        vehicleId: vehicle.id,
        index: currentIndex,
        failed: true,
      });
    }
  };

  const handleWhatsAppEnquiry = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const waText = getVehicleEnquiryMessage(vehicle.name);
    const url = buildWhatsAppUrl(waText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isEV = vehicle.category === 'electric';
  const isContain = vehicle.imageFit === 'contain';
  const cs = vehicle.cardSpecs;

  return (
    <div className="group relative h-full flex flex-col bg-[#111622] rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-red-950/20">
      
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,_#1E293B_0%,_#111726_65%,_#0A0D14_100%)]">
        {!allFailed ? (
          <img
            src={candidateImages[currentIndex]}
            alt={vehicle.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
              isContain
                ? 'object-contain object-center p-4 sm:p-5 drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]'
                : 'object-cover object-center'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#161D2B] to-[#0A0D14] p-6 text-center">
            <TVSHorseIcon className="w-12 h-8 mb-2 opacity-80" color="#E62D38" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">{vehicle.name}</span>
          </div>
        )}

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#111622] to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-white">
            {vehicle.series}
          </span>
          {vehicle.badge && (
            <span
              className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold tracking-wide uppercase rounded-md shadow-md ${
                isEV ? 'bg-cyan-500 text-black' : 'bg-red-600 text-white'
              }`}
            >
              {vehicle.badge}
            </span>
          )}
        </div>

        {/* Colors Preview Dots */}
        {vehicle.colors && vehicle.colors.length > 0 && (
          <div className="absolute bottom-2.5 right-3 flex items-center space-x-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {vehicle.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {vehicle.colors.length > 4 && (
              <span className="text-[9px] text-gray-300 font-bold">
                +{vehicle.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        
        {/* Title & Tagline (Consistent Height) */}
        <div className="min-h-[48px]">
          <h3 className="text-xl font-black text-white group-hover:text-red-400 transition tracking-tight leading-snug">
            {vehicle.name}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-1 mt-1">
            {vehicle.tagline}
          </p>
        </div>

        {/* Structured Vehicle Specifications Box (Zero Truncation, Improved Spacing) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-3.5 rounded-xl bg-[#0B0F18] border border-white/[0.07]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <Cpu className="w-3 h-3 text-red-500 shrink-0" />
              <span>{cs?.engineLabel || (isEV ? 'Battery' : 'Engine')}</span>
            </div>
            <div className="text-xs font-semibold text-gray-200 leading-snug">
              {cs?.engineValue || vehicle.specs.displacement.split(',')[0]}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {isEV ? (
                <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
              ) : (
                <Gauge className="w-3 h-3 text-red-400 shrink-0" />
              )}
              <span>{cs?.powerLabel || 'Max Power'}</span>
            </div>
            <div className="text-xs font-semibold text-gray-200 leading-snug">
              {cs?.powerValue || vehicle.specs.maxPower}
            </div>
          </div>

          <div className="space-y-0.5 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <Gauge className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{cs?.torqueLabel || 'Max Torque'}</span>
            </div>
            <div className="text-xs font-semibold text-gray-200 leading-snug">
              {cs?.torqueValue || vehicle.specs.maxTorque}
            </div>
          </div>

          <div className="space-y-0.5 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <Fuel className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{isEV ? 'Real Range' : 'Mileage'}</span>
            </div>
            <div className="text-xs font-semibold text-gray-200 leading-snug">
              {vehicle.specs.mileageOrRange}
            </div>
          </div>
        </div>

        {/* Footer Section Pushed to Bottom for Consistent Alignment */}
        <div className="mt-auto pt-1 space-y-3.5">
          {/* Pricing Estimation */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Starting Ex-Showroom*
              </div>
              <div className="text-lg font-black text-white whitespace-nowrap">
                {vehicle.startingPriceEstimate}
              </div>
            </div>
            <span className="text-[10px] text-gray-400 italic text-right leading-tight max-w-[135px]">
              Sitapur On-Road Quote on WhatsApp
            </span>
          </div>

          {/* Action Buttons — Enquire on WhatsApp (Left, 7 cols) + Explore Details (Right, 5 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="sm:col-span-7 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md shadow-[#25D366]/20 hover:shadow-[#25D366]/35 whitespace-nowrap"
              title={`Enquire about ${vehicle.name} on WhatsApp`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to={`/vehicles/${vehicle.slug}`}
              className="sm:col-span-5 flex items-center justify-center gap-1 py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition whitespace-nowrap"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>

          {/* Secondary Quick Test Ride Link */}
          <button
            type="button"
            onClick={() => openTestRide(vehicle.name)}
            className="w-full text-center text-[11px] text-gray-400 hover:text-red-400 font-medium transition py-0.5"
          >
            Book a Test Ride for {vehicle.name} →
          </button>
        </div>

      </div>
    </div>
  );
}
