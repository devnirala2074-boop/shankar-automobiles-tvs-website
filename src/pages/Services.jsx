import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Droplets
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { DEALERSHIP } from '../data/dealership';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, getServiceBookingMessage, isValidIndianPhone } from '../utils/whatsapp';

export default function Services() {
  const { openService } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    serviceType: 'Scheduled Periodic Maintenance',
    preferredDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.vehicle.trim()) {
      setError('Please provide your name, mobile number, and TVS vehicle model.');
      return;
    }
    if (!isValidIndianPhone(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError('');
    const waText = getServiceBookingMessage({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      vehicle: formData.vehicle.trim(),
    });
    const url = buildWhatsAppUrl(waText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const serviceOfferings = [
    {
      title: 'Scheduled Periodic Maintenance',
      description: 'Factory-prescribed servicing covering engine oil change, oil filter, air filter cleaning/replacement, spark plug inspection, carburettor/fuel injection calibration, and brake adjustment.',
      icon: 'Wrench',
      badge: 'Recommended every 3,000 km',
    },
    {
      title: '100% Genuine TVS Parts & TRU4 Oil',
      description: 'We exclusively utilize genuine TVS TRU4 synthetic/semi-synthetic engine oils and authentic TVS spare parts ensuring peak engine longevity, safety, and manufacturer warranty protection.',
      icon: 'Droplets',
      badge: 'Certified TVS Spares',
    },
    {
      title: 'TVS iQube EV Diagnostic & Care',
      description: 'Dedicated electric vehicle diagnostics for TVS iQube, checking lithium-ion battery health, firmware updates, regenerative braking system, and high-voltage wiring inspection.',
      icon: 'Zap',
      badge: 'Certified EV Bay',
    },
    {
      title: 'Brake, Tyre & Suspension Overhaul',
      description: 'Precision safety checks including brake pad and shoe inspection, disc brake bleeding, steering cone set lubrication, and suspension damper alignment for Indian roads.',
      icon: 'ShieldCheck',
      badge: 'Safety Assurance',
    },
  ];

  return (
    <div>
      <SEOHead 
        title="Authorized TVS Service & Maintenance | Shankar Automobiles Sitapur"
        description="Book authorized TVS two-wheeler servicing in Sitapur, Surguja. Genuine TVS TRU4 oil, scheduled maintenance, warranty claims, and certified diagnostics at Shankar Automobiles."
      />

      <PageHeader
        badge="Authorized Workshop"
        title="TVS Service & Maintenance"
        subtitle="Keep your TVS motorcycle or scooter performing at its peak with certified technician service and authentic TVS TRU4 spares."
        breadcrumb="Services"
      />

      {/* Service Highlights Grid */}
      <section className="py-16 bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              Factory Prescribed Care ({DEALERSHIP.name})
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Comprehensive Two-Wheeler Care
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Our workshop at Sitapur is equipped to handle everything from scheduled maintenance to precision tuning and electrical checks.
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={openService}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-950/30 transition"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Quick Book Service Slot</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {serviceOfferings.map((serv, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-[#111622] border border-white/10 space-y-4 hover:border-red-500/30 transition duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/15 text-red-500 flex items-center justify-center font-bold">
                    {index === 0 && <Wrench className="w-6 h-6" />}
                    {index === 1 && <Droplets className="w-6 h-6" />}
                    {index === 2 && <Zap className="w-6 h-6 text-cyan-400" />}
                    {index === 3 && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    {serv.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {serv.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {serv.description}
                </p>
              </div>
            ))}
          </div>

          {/* Service Booking Request Form */}
          <div className="rounded-3xl bg-gradient-to-r from-[#171F2D] via-[#1A2333] to-[#141B26] border border-white/10 p-8 sm:p-12">
            <div className="max-w-2xl mx-auto">
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Workshop Slot Request</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Book a Service Appointment
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  Schedule your servicing slot in advance. Our team in Sitapur will confirm technician availability on WhatsApp.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-[#111622] rounded-2xl border border-white/10">
                  <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Service Request Formatted!</h4>
                  <p className="text-xs text-gray-300">
                    Your service appointment details have been passed to WhatsApp. Send the message to finalize your booking with our Sitapur workshop team.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Submit Another Service Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sahu"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        TVS Vehicle Model *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apache RTR 160 4V or Jupiter 125"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Service Requirement
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                    >
                      <option value="Scheduled Periodic Maintenance" className="bg-[#121722]">Scheduled Periodic Maintenance</option>
                      <option value="Free Service Coupon Redemption" className="bg-[#121722]">Free Service Coupon Redemption</option>
                      <option value="Engine Oil & Oil Filter Replacement" className="bg-[#121722]">Engine Oil & Oil Filter Replacement</option>
                      <option value="TVS iQube EV Battery & Electrical Diagnostic" className="bg-[#121722]">TVS iQube EV Battery & Electrical Diagnostic</option>
                      <option value="Brake & Clutch Adjustment" className="bg-[#121722]">Brake & Clutch Adjustment</option>
                      <option value="General Troubleshooting / Noise Check" className="bg-[#121722]">General Troubleshooting / Noise Check</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Specific Remarks / Issues
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Mention any specific issue (e.g., hard cold start, chain rattle, tyre wear)..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-[#25D366]/20"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Confirm Booking on WhatsApp</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
