import React, { useState } from 'react';
import { 
  Tag, 
  Percent, 
  RefreshCw, 
  CheckCircle2, 
  Sparkles, 
  Info
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { DEALERSHIP } from '../data/dealership';
import { VEHICLES } from '../data/vehicles';
import { buildWhatsAppUrl, getFinanceEnquiryMessage, DEFAULT_WHATSAPP_MESSAGE, isValidIndianPhone } from '../utils/whatsapp';

export default function Offers() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: VEHICLES[0]?.name || '',
    downPayment: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and mobile number.');
      return;
    }
    if (!isValidIndianPhone(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError('');
    const waText = getFinanceEnquiryMessage({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
    });
    const url = buildWhatsAppUrl(waText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleQuickOfferWhatsApp = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <SEOHead 
        title="TVS Offers, Finance & Exchange | Shankar Automobiles – Sitapur"
        description="Explore verified TVS finance schemes, low down payment options, and old two-wheeler exchange benefits at Shankar Automobiles in Sitapur, Surguja. Contact our team for current offers."
      />

      <PageHeader
        badge="Promotions & Financing"
        title="Dealership Offers & Finance"
        subtitle="Explore verified financing solutions, exchange valuation, and prevailing TVS Motor festive schemes in Sitapur."
        breadcrumb="Offers"
      />

      {/* Main Content */}
      <section className="py-16 bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Transparency Disclaimer Notice */}
          <div className="mb-12 p-6 rounded-2xl bg-[#121722] border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-gray-300">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block sm:inline">Dealership Commitment to Honest Pricing: </strong>
                We do not publish artificial discounts, deceptive interest rates, or exaggerated EMI claims. All offers are governed by TVS Motor Company and partnered financial institutions.
              </div>
            </div>
            <button
              onClick={handleQuickOfferWhatsApp}
              className="shrink-0 px-4 py-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] rounded-xl text-xs font-bold transition flex items-center space-x-1.5 group"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>Ask About Today's Offers</span>
            </button>
          </div>

          {/* Three Main Support Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Column 1: Seasonal / Current Offers */}
            <div className="p-8 rounded-3xl bg-[#111622] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Current TVS Offers</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Seasonal benefits, festive schemes, and special loyalty advantages are updated frequently based on TVS Motor guidelines and Chhattisgarh regional campaigns.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300">
                  <p className="font-semibold text-white mb-1">Live Status:</p>
                  Contact our dealership for the latest offers and prevailing model-wise discounts in Sitapur.
                </div>
              </div>

              <button
                onClick={handleQuickOfferWhatsApp}
                className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition"
              >
                Inquire About Active Schemes
              </button>
            </div>

            {/* Column 2: Easy Finance & Low EMI */}
            <div className="p-8 rounded-3xl bg-[#111622] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Low Down Payment Finance</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Through partners like TVS Credit, HDFC Bank, IDFC First, and SBI, we offer flexible tenures (12 to 48 months), low initial down payment options, and quick spot approvals.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Minimal KYC paperwork required</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Customizable monthly EMI plans</span>
                  </li>
                </ul>
              </div>

              <a
                href="#finance-calculator-form"
                className="w-full mt-4 py-3 bg-white/10 hover:bg-white/15 text-white text-center font-semibold text-xs rounded-xl border border-white/10 transition block"
              >
                Calculate EMI on WhatsApp
              </a>
            </div>

            {/* Column 3: Exchange & Upgrade */}
            <div className="p-8 rounded-3xl bg-[#111622] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Two-Wheeler Exchange</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Upgrade your daily commute. Bring your existing motorcycle or scooter of any brand to Shankar Automobiles for an honest on-spot physical inspection and valuation.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300 space-y-1">
                  <p className="font-semibold text-white">Required for Exchange:</p>
                  <p>1. Original RC Book & Active Insurance</p>
                  <p>2. Vehicle Owner's Aadhaar & PAN</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const url = buildWhatsAppUrl(`Hello ${DEALERSHIP.name}, I would like to get my old two-wheeler evaluated for exchange towards a new TVS model in Sitapur.`);
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="w-full mt-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl transition shadow-md shadow-[#25D366]/20 flex items-center justify-center space-x-1.5"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Request Exchange Valuation</span>
              </button>
            </div>

          </div>

          {/* Finance & EMI Enquiry Form */}
          <div id="finance-calculator-form" className="rounded-3xl bg-gradient-to-r from-[#171F2D] via-[#1A2333] to-[#141B26] border border-white/10 p-8 sm:p-12">
            <div className="max-w-2xl mx-auto">
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalized Finance Assessment</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Request an EMI Breakdown
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  Submit your preference and we will calculate the best available down payment and tenure options via WhatsApp.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-[#111622] rounded-2xl border border-white/10">
                  <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Enquiry Prepared!</h4>
                  <p className="text-xs text-gray-300">
                    Your details have been compiled and opened in WhatsApp. Please send the message to initiate financing evaluation with our Sitapur team.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Submit Another Query
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
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amit Kumar"
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
                        Interested TVS Model *
                      </label>
                      <select
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                      >
                        {VEHICLES.map((v) => (
                          <option key={v.id} value={v.name} className="bg-[#121722] text-white">
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Planned Down Payment (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 20,000 or 35,000"
                        value={formData.downPayment}
                        onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Specific Questions / Preferred Tenure
                    </label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Interested in 24-month or 36-month tenure, TVS Credit eligibility, exchange old bike..."
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
                    <span>Send Finance Request via WhatsApp</span>
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
