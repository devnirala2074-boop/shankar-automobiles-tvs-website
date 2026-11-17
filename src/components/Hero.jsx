import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Bike, 
  Award, 
  MapPin, 
  Wrench 
} from 'lucide-react';
import { TVSHorseIcon } from './TVSLogo';
import WhatsAppIcon from './WhatsAppIcon';
import { useModal } from '../context/ModalContext';
import { DEALERSHIP } from '../data/dealership';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';

export default function Hero() {
  const { openTestRide } = useModal();

  const handleWhatsAppChat = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative w-full max-w-full min-h-[82vh] sm:min-h-[88vh] flex items-center justify-center bg-[#090C12] overflow-hidden">
      
      {/* Background Cinematic Official TVS Image with Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.tvsmotor.com/assets/img/brands/apche-rr310/agility-bg.webp"
          alt="TVS Apache RR 310 - Shankar Automobiles Sitapur"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[70%_center] sm:object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/70 to-transparent" />
        {/* Subtle Racing Stripe Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-24 text-center sm:text-left flex flex-col justify-center">
        
        {/* Dealership Identification Label */}
        <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-[13px] font-semibold uppercase tracking-wider sm:tracking-widest text-gray-300 mb-4 mx-auto sm:mx-0 max-w-full">
          <TVSHorseIcon className="w-5 h-3.5 shrink-0" color="#E62D38" />
          <span>AUTHORIZED TVS DEALER | SITAPUR, SURGUJA</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl break-words">
          Experience the <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">
            Thrill of Every Ride.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto sm:mx-0">
          Explore the latest TVS motorcycles and scooters at <strong className="text-white font-semibold">{DEALERSHIP.name}</strong>, Sitapur. Experience track-born performance, revolutionary hybrid scooters, and smart electric mobility.
        </p>

        {/* CTA Button Group — Responsive Full-Width on Mobile, Consistent Height */}
        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center sm:justify-start w-full max-w-full">
          <Link
            to="/vehicles"
            className="w-full sm:w-auto h-12 sm:h-[52px] px-6 sm:px-7 inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-red-950/50 transition duration-300 sm:hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Bike className="w-5 h-5 shrink-0" />
            <span>Explore Vehicles</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={() => openTestRide()}
            className="w-full sm:w-auto h-12 sm:h-[52px] px-6 sm:px-7 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 transition duration-300 backdrop-blur-sm hover:border-red-500/50 whitespace-nowrap"
          >
            <span>Book a Test Ride</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppChat}
            className="w-full sm:w-auto h-12 sm:h-[52px] px-6 sm:px-7 inline-flex items-center justify-center gap-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] font-bold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/10 group whitespace-nowrap"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Trust Badges Bar — Responsive Grid with min-w-0 to Prevent Overflow */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left w-full">
          
          <div className="min-w-0 flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
              <TVSHorseIcon className="w-5 h-3.5 sm:w-6 sm:h-4" color="#E62D38" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Authorized TVS</div>
              <div className="text-[11px] text-gray-400 truncate">Official Dealership</div>
            </div>
          </div>

          <div className="min-w-0 flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Full TVS Lineup</div>
              <div className="text-[11px] text-gray-400 truncate">Apache, Jupiter & EV</div>
            </div>
          </div>

          <div className="min-w-0 flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Genuine TVS Parts</div>
              <div className="text-[11px] text-gray-400 truncate">TRU4 Certified Spares</div>
            </div>
          </div>

          <div className="min-w-0 flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Sitapur, Surguja</div>
              <div className="text-[11px] text-gray-400 truncate">NH-43 Landmark Spot</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
