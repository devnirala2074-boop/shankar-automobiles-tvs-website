import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';
import { DEALERSHIP } from '../data/dealership';

/**
 * Authentic Floating WhatsApp Contact Button
 * - Positioned in outer viewport corner to prevent overlapping vehicle card buttons
 * - Official WhatsApp brand color (#25D366) & vector icon
 * - Opens direct WhatsApp chat with verified dealership number
 */
export default function WhatsAppFloatingButton() {
  const handleClick = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-4 sm:right-3.5 z-40">
      <button
        type="button"
        onClick={handleClick}
        className="group relative flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label={`Chat with ${DEALERSHIP.name} on WhatsApp`}
        title={`Chat with ${DEALERSHIP.name} on WhatsApp`}
      >
        {/* Official WhatsApp Vector Icon */}
        <WhatsAppIcon className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />

        {/* Clean, Non-Intrusive Desktop Hover Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 hidden lg:group-hover:inline-flex items-center whitespace-nowrap rounded-lg bg-[#0F1420] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
