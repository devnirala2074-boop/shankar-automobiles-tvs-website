import React from 'react';
import { Bike, ShieldCheck, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';

export default function EnquiryCTA({
  title = "Ready to Ride Your Dream TVS?",
  subtitle = "Visit Shankar Automobiles on NH-43, Sitapur or connect with our customer specialists on WhatsApp for personalized quotes, exchange evaluation, and immediate test ride scheduling.",
}) {
  const { openTestRide, openEnquiry } = useModal();

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-16 px-4 sm:px-8 bg-gradient-to-b from-[#0B0E14] to-[#121722] overflow-hidden">
      {/* Decorative Red Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#171E2B] via-[#1A2232] to-[#151C27] border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden">
        
        {/* TVS Racing Decal Lines */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-2xl" />
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official TVS Showroom Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Zero Hidden Fees</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Immediate Spot Valuation for Exchange</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Flexible Low-EMI Finance</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center space-x-2.5 py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/35 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => openTestRide()}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-xl shadow-red-950/40 transition duration-300 transform hover:scale-[1.02]"
            >
              <Bike className="w-4 h-4" />
              <span>Book a Test Ride</span>
            </button>

            <button
              onClick={() => openEnquiry()}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white font-semibold text-xs rounded-xl border border-white/10 transition"
            >
              <span>Get On-Road Price Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
