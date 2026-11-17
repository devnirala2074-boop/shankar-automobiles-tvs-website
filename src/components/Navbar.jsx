import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { TVSHorseIcon } from './TVSLogo';
import { DEALERSHIP } from '../data/dealership';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';

export default function Navbar() {
  const [openMenuPath, setOpenMenuPath] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openTestRide, openEnquiry } = useModal();

  const mobileMenuOpen = openMenuPath === location.pathname;
  const closeMobileMenu = () => setOpenMenuPath(null);
  const toggleMobileMenu = () =>
    setOpenMenuPath((prev) => (prev === location.pathname ? null : location.pathname));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and allow Escape key to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenMenuPath(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Offers', path: '/offers' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleQuickWhatsApp = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Slim Top Utility Bar */}
      <div className="bg-[#080A0F] text-[11px] text-gray-400 border-b border-white/5 py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Location Info */}
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
            <span className="truncate">NH-43, Opp. Central Bank, Sitapur, Surguja (C.G.)</span>
          </div>

          {/* Timings & Direct WhatsApp */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3 h-3 text-red-500/80 shrink-0" />
              <span>Open 7 Days: 9:30 AM – 7:30 PM</span>
            </div>
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] hover:text-white font-medium text-[11px] transition-all duration-200 whitespace-nowrap group"
              title="Chat with Shankar Automobiles on WhatsApp"
            >
              <WhatsAppIcon className="w-3 h-3 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
              <span>WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Single-Row Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0B0E14]/95 backdrop-blur-md border-white/10 shadow-xl h-16'
            : 'bg-[#0B0E14] border-white/5 h-[68px]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Single Dealership Logo & Primary Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-md shadow-red-950/50 border border-red-500/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <TVSHorseIcon className="w-6 h-4" color="#FFFFFF" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 whitespace-nowrap leading-none">
                <span className="text-[15px] sm:text-lg xl:text-xl font-black tracking-tight text-white uppercase group-hover:text-red-400 transition-colors">
                  SHANKAR
                </span>
                <span className="text-[15px] sm:text-lg xl:text-xl font-black tracking-tight text-red-500 uppercase">
                  AUTOMOBILES
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-gray-400 whitespace-nowrap leading-none mt-1">
                Authorized TVS Dealer • Sitapur
              </span>
            </div>
          </Link>

          {/* Center: Desktop Single-Line Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right: Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openTestRide()}
              className="min-w-[132px] xl:min-w-[144px] px-4 xl:px-5 py-2 text-xs xl:text-sm font-semibold text-gray-200 hover:text-white border border-white/20 hover:border-red-500/50 rounded-xl transition-all duration-200 hover:bg-white/5 whitespace-nowrap text-center shrink-0"
            >
              Book Test Ride
            </button>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="inline-flex items-center justify-center gap-1.5 px-4 xl:px-5 py-2 text-xs xl:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-900/30 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Enquire Now</span>
            </button>
          </div>

          {/* Right: Tablet & Mobile Controls */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] transition"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            </button>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="px-2.5 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-900/30 whitespace-nowrap transition"
            >
              Enquire Now
            </button>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Tablet & Mobile Hamburger Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 max-h-[calc(100dvh-96px)] bg-[#0A0D14]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl z-50 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-red-500 px-3 pb-1.5">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition ${
                    isActive
                      ? 'bg-red-600/15 text-red-400 border border-red-500/25 font-bold'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-5 mt-5 border-t border-white/10 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openTestRide();
                }}
                className="w-full py-3 px-4 text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition whitespace-nowrap"
              >
                Book Test Ride
              </button>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openEnquiry();
                }}
                className="w-full py-3 px-4 text-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-900/40 transition whitespace-nowrap"
              >
                Enquire Now
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                handleQuickWhatsApp();
              }}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-xl shadow-lg shadow-[#25D366]/20 transition-all duration-200 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat on WhatsApp ({DEALERSHIP.contact.phoneDisplay})</span>
            </button>

            <div className="text-center text-xs text-gray-400 pt-3 border-t border-white/5">
              <p className="font-semibold text-white">{DEALERSHIP.name} — Authorized TVS Dealer</p>
              <p className="mt-0.5">NH-43, Sitapur, Surguja (C.G.) - 497111</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
