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
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center bg-[#090C12] overflow-hidden">
      
      {/* Background Cinematic Official TVS Image with Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.tvsmotor.com/assets/img/brands/apche-rr310/agility-bg.webp"
          alt="TVS Apache RR 310 - Shankar Automobiles Sitapur"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/70 to-transparent" />
        {/* Subtle Racing Stripe Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center sm:text-left flex flex-col justify-center">
        
        {/* Dealership Identification Label */}
        <div className="inline-flex items-center space-x-2.5 text-xs sm:text-[13px] font-semibold uppercase tracking-widest text-gray-300 mb-4 mx-auto sm:mx-0">
          <TVSHorseIcon className="w-5 h-3.5 shrink-0" color="#E62D38" />
          <span>AUTHORIZED TVS DEALER | SITAPUR, SURGUJA</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl">
          Experience the <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">
            Thrill of Every Ride.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-base sm:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto sm:mx-0">
          Explore the latest TVS motorcycles and scooters at <strong className="text-white font-semibold">{DEALERSHIP.name}</strong>, Sitapur. Experience track-born performance, revolutionary hybrid scooters, and smart electric mobility.
        </p>

        {/* CTA Button Group */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
          <Link
            to="/vehicles"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl shadow-xl shadow-red-950/50 transition duration-300 transform hover:translate-y-[-2px]"
          >
            <Bike className="w-5 h-5" />
            <span>Explore Vehicles</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <button
            type="button"
            onClick={() => openTestRide()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/20 transition duration-300 backdrop-blur-sm hover:border-red-500/50"
          >
            <span>Book a Test Ride</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppChat}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] font-bold text-base rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/10 transform hover:scale-[1.02] active:scale-95 group"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
              <TVSHorseIcon className="w-6 h-4" color="#E62D38" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Authorized TVS</div>
              <div className="text-[11px] text-gray-400">Official Dealership</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Full TVS Lineup</div>
              <div className="text-[11px] text-gray-400">Apache, Jupiter & EV</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Genuine TVS Parts</div>
              <div className="text-[11px] text-gray-400">TRU4 Certified Spares</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Sitapur, Surguja</div>
              <div className="text-[11px] text-gray-400">NH-43 Landmark Spot</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
