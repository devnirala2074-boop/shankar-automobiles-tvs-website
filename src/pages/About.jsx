import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Wrench, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EnquiryCTA from '../components/EnquiryCTA';
import SEOHead from '../components/SEOHead';
import { TVSHorseIcon } from '../components/TVSLogo';
import { DEALERSHIP } from '../data/dealership';
import { FAQS } from '../data/faq';

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      <SEOHead 
        title="About Shankar Automobiles | Authorized TVS Dealer – Sitapur, Surguja"
        description="Learn about Shankar Automobiles, the authorized TVS two-wheeler dealership located in Sitapur, Surguja, Chhattisgarh. Discover our customer philosophy, showroom facilities, and TVS service standards."
      />

      <PageHeader
        badge="About The Dealership"
        title="Shankar Automobiles, Sitapur"
        subtitle="Your trusted authorized TVS Motor sales and service partner in Surguja district, Chhattisgarh."
        breadcrumb="About Us"
      />

      {/* Overview Section */}
      <section className="py-20 bg-[#0B0E15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized TVS Dealership</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Committed to Authentic TVS Excellence in Sitapur
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                <strong className="text-white">Shankar Automobiles</strong> is an authorized dealer for TVS Motor Company, located on NH-43 in Sitapur, Surguja, Chhattisgarh. We bridge riders to TVS Motor’s world-class engineering, from the high-octane Apache racing motorcycles to practical everyday Jupiter scooters and the green future of TVS iQube electric mobility.
              </p>

              <p className="text-sm text-gray-400 leading-relaxed">
                Our dealership is built on integrity, transparent pricing, and dependable post-purchase service. We do not believe in hidden costs, deceptive offers, or artificial promises. Every customer walking through our doors receives straightforward guidance on variant choices, honest on-road cost breakdowns, and authentic TVS manufacturer warranty.
              </p>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Authorized TVS Two-Wheeler Sales</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Genuine TVS Spares & TRU4 Oil</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Spot Two-Wheeler Exchange Valuation</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Chhattisgarh RTO Documentation</span>
                </div>
              </div>

            </div>

            {/* Visual Showcase Box */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#121722] aspect-[16/11]">
                <img
                  src="https://www.tvsmotor.com/assets/img/brands/apche-rr310/agility-bg.webp"
                  alt="TVS Flagship Showcase - Shankar Automobiles Sitapur"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating Badge Card */}
              <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:left-6 p-5 rounded-2xl bg-[#171E2D]/95 backdrop-blur-md border border-white/10 shadow-2xl max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                    <TVSHorseIcon className="w-6 h-4 text-white" color="#FFFFFF" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Sitapur, Surguja</div>
                    <div className="text-[11px] text-gray-400">Authorized TVS Destination</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Dealership Core Pillars */}
      <section className="py-20 bg-[#090C12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              Our Operating Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Every process at Shankar Automobiles is designed to make two-wheeler ownership seamless and stress-free for customers across Sitapur and surrounding regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl bg-[#111622] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <TVSHorseIcon className="w-7 h-4 text-red-500" color="#E62D38" />
              </div>
              <h3 className="text-xl font-bold text-white">Full TVS Portfolio</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Whether you are looking for an Apache RTR performance commuter, an iconic Ronin scrambler, an economical TVS Sport, or the zero-emission TVS iQube, we bring TVS’s full capability to Sitapur.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111622] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Authorized Care & Diagnostics</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Our service bay features trained technicians who follow official TVS maintenance checklists using certified computerized diagnostic systems, genuine gaskets, filters, and TVS TRU4 high-performance lubricants.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111622] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Direct & Honest Dealing</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                We respect your hard-earned money. From upfront quotation sheets to assistance with low-interest bank finance and fair exchange value, you always experience complete clarity.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-20 bg-[#0C1018] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              Customer Guidance
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Everything you need to know about purchasing, registering, and servicing your TVS vehicle at Shankar Automobiles.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#121722] border border-white/10 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left text-white font-semibold text-sm sm:text-base hover:text-red-400 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-red-500 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Location Bar */}
      <section className="py-14 bg-[#090C12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white">Visit Us on National Highway 43</h3>
            <p className="text-xs text-gray-400 mt-1">
              {DEALERSHIP.address.fullAddress}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={DEALERSHIP.links.googleMapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 transition"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition"
            >
              <span>Contact Showroom</span>
            </Link>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </div>
  );
}
