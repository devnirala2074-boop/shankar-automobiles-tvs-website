import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import TVSLogo, { TVSHorseIcon } from './TVSLogo';
import InstagramIcon from './InstagramIcon';
import WhatsAppIcon from './WhatsAppIcon';
import { DEALERSHIP } from '../data/dealership';
import { VEHICLES } from '../data/vehicles';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const handleWhatsAppClick = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const featuredLinks = VEHICLES.slice(0, 6);

  return (
    <footer className="bg-[#07090E] text-gray-300 border-t border-white/10 pt-16 pb-20 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview (Col span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white shadow-lg shadow-red-900/40 border border-red-500/30">
                <TVSHorseIcon className="w-6 h-4 text-white" color="#FFFFFF" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-black tracking-tight text-white uppercase">
                    SHANKAR
                  </span>
                  <span className="text-xl font-black tracking-tight text-red-500 uppercase">
                    AUTOMOBILES
                  </span>
                </div>
                <div className="text-[10px] tracking-widest uppercase font-semibold text-gray-400">
                  Authorized TVS Dealer • Sitapur
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Shankar Automobiles is your premier authorized TVS Motor two-wheeler dealership in Sitapur, Surguja. We deliver authentic TVS motorcycles, scooters, electric vehicles, genuine TRU4 spare parts, and certified technician service.
            </p>

            {/* Official TVS Dealership Badge */}
            <div className="inline-flex items-center space-x-3 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Authorized Dealership</span>
              <div className="h-3.5 w-px bg-white/20" />
              <TVSLogo className="h-4 w-auto" theme="dark" />
            </div>

            {/* Social & Directory Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={DEALERSHIP.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition"
              >
                <InstagramIcon className="w-4 h-4 text-pink-500" />
                <span>Instagram Profile</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>

              <a
                href={DEALERSHIP.links.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition"
              >
                <span className="font-bold text-orange-400 text-xs">JD</span>
                <span>Justdial Verified</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-sm" />
              <span>Explore Website</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  TVS Vehicle Catalogue
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  Festive & Finance Offers
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  TVS Service & Maintenance
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  Vehicle Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  About Dealership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* TVS Popular Models */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-sm" />
              <span>Popular TVS Models</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {featuredLinks.map((veh) => (
                <li key={veh.id}>
                  <Link
                    to={`/vehicles/${veh.slug}`}
                    className="text-gray-400 hover:text-red-400 hover:translate-x-1 inline-flex items-center space-x-1.5 transition text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 text-red-500 shrink-0" />
                    <span>{veh.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dealership Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-sm" />
              <span>Sitapur Showroom</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {DEALERSHIP.address.line1}, {DEALERSHIP.address.landmark}, Sitapur, Surguja, CG - {DEALERSHIP.address.pincode}
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`tel:${DEALERSHIP.contact.phoneRaw}`}
                  className="hover:text-white transition font-medium"
                >
                  {DEALERSHIP.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{DEALERSHIP.contact.timings.days}: {DEALERSHIP.contact.timings.hours}</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] rounded-xl transition font-semibold text-xs group"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

              <a
                href={DEALERSHIP.links.googleMapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl transition text-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Regulatory & Disclaimer Section */}
        <div className="py-6 border-b border-white/10 text-[11px] text-gray-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-gray-300">Disclaimer & Transparency Notice: </strong>
            {DEALERSHIP.disclaimers.pricing}
          </p>
          <p>
            TVS, Apache, RTR, RR 310, Raider, Ronin, Jupiter, Ntorq, iQube, and XL100 are registered trademarks of TVS Motor Company Ltd. Shankar Automobiles is an authorized dealer operating in Sitapur, Surguja district, Chhattisgarh.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {CURRENT_YEAR} Shankar Automobiles. All Rights Reserved. Sitapur, Surguja, Chhattisgarh.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Customer-First TVS Experience</span>
            </span>
            <Link to="/contact" className="hover:text-white transition">
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
