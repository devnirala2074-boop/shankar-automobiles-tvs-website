import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bike, 
  ShieldCheck, 
  Wrench, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Gauge,
  Tag
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { TVSHorseIcon } from '../components/TVSLogo';
import Hero from '../components/Hero';
import VehicleCard from '../components/VehicleCard';
import EnquiryCTA from '../components/EnquiryCTA';
import SEOHead from '../components/SEOHead';
import { VEHICLES, VEHICLE_CATEGORIES } from '../data/vehicles';
import { DEALERSHIP } from '../data/dealership';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../utils/whatsapp';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { openEnquiry } = useModal();

  const featuredVehicles =
    activeCategory === 'all'
      ? VEHICLES.filter((v) => v.isFeatured).slice(0, 9)
      : VEHICLES.filter((v) => v.category === activeCategory);

  const handleGeneralWhatsApp = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <SEOHead 
        title="Shankar Automobiles | Authorized TVS Two-Wheeler Dealer – Sitapur, Surguja"
        description="Official TVS Motor dealership in Sitapur, Surguja, CG. Explore TVS Apache, Raider 125, Jupiter, Ronin, and iQube EV. Book a test ride and enquire on-road prices on WhatsApp."
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Vehicle Categories Preview Bar */}
      <section className="py-12 bg-[#0B0E15] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
                Explore The Lineup
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Vehicle Categories
              </h2>
            </div>
            <Link
              to="/vehicles"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-gray-300 hover:text-red-400 transition"
            >
              <span>View All TVS Models</span>
              <ChevronRight className="w-4 h-4 text-red-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Motorcycles Card */}
            <Link
              to="/vehicles?category=motorcycle"
              className="group relative rounded-2xl bg-gradient-to-br from-[#131924] to-[#1A2230] border border-white/10 hover:border-red-500/50 p-6 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-red-950/20"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-red-600/10 rounded-full blur-xl group-hover:bg-red-600/20 transition" />
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                Motorcycles
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                From track-bred Apache RR 310 and RTR beasts to the wicked Raider 125 and modern-retro Ronin scrambler.
              </p>
              <div className="mt-4 flex items-center space-x-1 text-xs font-semibold text-red-400 group-hover:translate-x-1 transition">
                <span>Explore Motorcycles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Scooters Card */}
            <Link
              to="/vehicles?category=scooter"
              className="group relative rounded-2xl bg-gradient-to-br from-[#131924] to-[#1A2230] border border-white/10 hover:border-red-500/50 p-6 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-red-950/20"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-amber-600/10 rounded-full blur-xl group-hover:bg-amber-600/20 transition" />
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                Scooters
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                India’s favorite family ride: All-New Jupiter 110 with iGO Assist, ultra-spacious Jupiter 125, and high-performance Ntorq 125.
              </p>
              <div className="mt-4 flex items-center space-x-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition">
                <span>Explore Scooters</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Electric Vehicles Card */}
            <Link
              to="/vehicles?category=electric"
              className="group relative rounded-2xl bg-gradient-to-br from-[#131924] to-[#1A2230] border border-white/10 hover:border-cyan-500/50 p-6 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-cyan-600/10 rounded-full blur-xl group-hover:bg-cyan-600/20 transition" />
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                Electric Vehicles (EV)
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                TVS iQube Series with real-world range up to 150 km, Alexa connectivity, silent motor drive, and 30 paise/km economy.
              </p>
              <div className="mt-4 flex items-center space-x-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition">
                <span>Explore TVS iQube</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. Featured Vehicles Section */}
      <section className="py-14 sm:py-20 bg-[#090C12] relative w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full min-w-0">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 min-w-0">
            <div className="min-w-0">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide uppercase mb-3 max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="truncate">Popular At Shankar Automobiles</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Featured TVS Vehicles
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
                Explore the most sought-after TVS motorcycles and scooters available through our Sitapur showroom.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl bg-[#121722] border border-white/10 max-w-full">
              {VEHICLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {/* Action to see entire catalogue */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/vehicles"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 transition hover:border-red-500/50"
            >
              <span>Explore Complete TVS Catalogue ({VEHICLES.length} Models)</span>
              <ArrowRight className="w-4 h-4 text-red-500 shrink-0" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Shankar Automobiles? */}
      <section className="py-20 bg-[#0C1018] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              The Shankar Automobiles Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Customers Trust Us in Sitapur
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              We are dedicated to providing a transparent, prompt, and customer-first two-wheeler purchasing and servicing experience in Surguja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEALERSHIP.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121824] border border-white/10 hover:border-red-500/30 transition duration-300 space-y-4 hover:translate-y-[-2px]"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center font-bold">
                  {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 1 && <TVSHorseIcon className="w-7 h-5" color="#E62D38" />}
                  {idx === 2 && <Wrench className="w-6 h-6" />}
                  {idx === 3 && <MapPin className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Promotional Offers & Finance Guidance */}
      <section className="py-14 sm:py-20 bg-[#090C12] relative w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="rounded-3xl bg-gradient-to-r from-[#171F2D] via-[#1E2638] to-[#161C28] border border-white/10 p-5 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Dealership Offers & Finance Support</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Transparent Two-Wheeler Finance & Exchange
                </h2>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Plan your new ride with confidence. We assist you with hassle-free loan documentation, low down payment options, and instant fair-value appraisal for your old two-wheeler.
                </p>

                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Affiliated with TVS Credit, HDFC Bank, SBI & leading financiers.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparent breakdown of On-Road pricing with zero hidden surcharges.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bring your old two-wheeler for spot inspection and upgrade valuation.</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/offers"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 transition"
                  >
                    <span>View Dealership Offers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openEnquiry()}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition"
                  >
                    <span>Request EMI Estimate</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F1420] border border-white/10 space-y-4">
                <div className="text-xs font-bold text-gray-300 uppercase tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>Sitapur Showroom Notice</span>
                  <span className="text-[10px] text-amber-400">Verified Policy</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {DEALERSHIP.disclaimers.offers}
                </p>
                <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/20 text-xs text-red-300">
                  <strong>Need immediate consultation?</strong> Connect with our Sitapur team directly on WhatsApp for live stock status and today's prevailing festive schemes.
                </div>
                <button
                  onClick={handleGeneralWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl transition shadow-md shadow-[#25D366]/20"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. Dealership Preview & Location Spotlight */}
      <section className="py-20 bg-[#0B0E15] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Our Showroom</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Shankar Automobiles, Sitapur
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                Conveniently located on National Highway 43 in Mulazimpara, directly opposite the Central Bank of India. Our showroom features the full range of TVS two-wheelers with dedicated customer test ride facilities and an authorized service bay.
              </p>

              {/* Quick Info List */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Full Address</div>
                    <div className="text-xs text-gray-400">{DEALERSHIP.address.fullAddress}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Contact & WhatsApp: {DEALERSHIP.contact.phoneDisplay}</div>
                    <div className="text-xs text-gray-400">Available 7 Days a week ({DEALERSHIP.contact.timings.hours})</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={DEALERSHIP.links.googleMapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 transition"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition"
                >
                  <span>Contact Page & Form</span>
                </Link>
              </div>
            </div>

            {/* Google Maps Embed Preview */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121722] aspect-[16/10] relative">
              <iframe
                title="Shankar Automobiles Sitapur Location Map"
                src={DEALERSHIP.links.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[110%]"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 7. Action CTA Section */}
      <EnquiryCTA />
    </div>
  );
}
