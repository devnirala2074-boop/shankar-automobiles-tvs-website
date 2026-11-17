import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import WhatsAppIcon from '../components/WhatsAppIcon';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { DEALERSHIP } from '../data/dealership';
import { buildWhatsAppUrl, getContactMessage, DEFAULT_WHATSAPP_MESSAGE, isValidIndianPhone } from '../utils/whatsapp';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, mobile number, and enquiry message.');
      return;
    }
    if (!isValidIndianPhone(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError('');
    const waText = getContactMessage({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    });
    const url = buildWhatsAppUrl(waText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <SEOHead 
        title="Contact Shankar Automobiles | TVS Showroom – Sitapur, Surguja"
        description="Contact Shankar Automobiles, authorized TVS dealership located on NH-43, Sitapur, Surguja, CG. Phone, WhatsApp, showroom timings, Google Maps directions, and enquiry form."
      />

      <PageHeader
        badge="Get in Touch"
        title="Contact Shankar Automobiles"
        subtitle="Connect with our sales and service consultants in Sitapur, Surguja for quotations, test rides, or general queries."
        breadcrumb="Contact Us"
      />

      {/* Main Contact Grid */}
      <section className="py-16 bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Dealership Information & Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Authorized TVS Dealership
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Visit or Connect Today
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                  We are conveniently situated on National Highway 43 in Sitapur. Walk in for a cup of tea, test ride our bikes, or chat with us instantly on WhatsApp.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                
                {/* Address Card */}
                <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-400">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>Showroom Address</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {DEALERSHIP.name}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {DEALERSHIP.address.fullAddress}
                  </p>
                  <div className="pt-2">
                    <a
                      href={DEALERSHIP.links.googleMapsSearch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp & Phone Card */}
                <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#25D366]">
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Official Phone & WhatsApp</span>
                    </div>
                    <a
                      href={`tel:${DEALERSHIP.contact.phoneRaw}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-white hover:text-red-400 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-red-500" />
                      <span>{DEALERSHIP.contact.phoneDisplay}</span>
                    </a>
                  </div>
                  <p className="text-xs text-gray-400">
                    Get rapid replies on model availability, on-road prices, and loan documentation.
                  </p>
                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#25D366]/20"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Open WhatsApp Chat ({DEALERSHIP.contact.phoneDisplay})</span>
                  </button>
                </div>

                {/* Timings Card */}
                <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>Showroom Sales:</span>
                    <span className="font-semibold text-white">{DEALERSHIP.contact.timings.hours}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>Workshop Services:</span>
                    <span className="font-semibold text-white">{DEALERSHIP.contact.timings.serviceHours}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 pt-1">
                    Open 7 Days a week (Sunday showroom is open).
                  </div>
                </div>

                {/* Verified Profiles */}
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={DEALERSHIP.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-500" />
                    <span>Instagram Profile</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>

                  <a
                    href={DEALERSHIP.links.justdial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition"
                  >
                    <span className="font-bold text-orange-400 text-xs">JD</span>
                    <span>Justdial Listing</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                </div>

              </div>

            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#111622] border border-white/10 p-8 sm:p-10 shadow-2xl">
                
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Send an Enquiry Message
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Fill out the form below and your message will open directly in WhatsApp for quick response from our Sitapur team.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 text-center space-y-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                    <p className="text-xs text-gray-300">
                      Your enquiry has been passed to WhatsApp. Send the message to chat directly with our Sitapur showroom manager.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition"
                    >
                      Send Another Message
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
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
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

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Subject / Topic *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                      >
                        <option value="New Two-Wheeler On-Road Pricing">New Two-Wheeler On-Road Pricing</option>
                        <option value="TVS Apache Racing Series Query">TVS Apache Racing Series Query</option>
                        <option value="TVS Jupiter / Scooter Enquiry">TVS Jupiter / Scooter Enquiry</option>
                        <option value="TVS iQube Electric Vehicle Query">TVS iQube Electric Vehicle Query</option>
                        <option value="Old Bike Exchange Valuation">Old Bike Exchange Valuation</option>
                        <option value="Two-Wheeler Loan & EMI Scheme">Two-Wheeler Loan & EMI Scheme</option>
                        <option value="Service, Spares & Maintenance">Service, Spares & Maintenance</option>
                        <option value="Other / General Feedback">Other / General Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Your Message / Question *
                      </label>
                      <textarea
                        rows="4"
                        required
                        placeholder="Please share which vehicle model, color or service you are interested in..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition resize-none"
                      ></textarea>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                      <span>Direct connection: Opens directly with dealer staff on WhatsApp.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-[#25D366]/20"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Send Message via WhatsApp</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

          {/* Full Width Google Map Section */}
          <div className="mt-16 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Google Maps Location</h3>
                <p className="text-xs text-gray-400">
                  Located right on NH-43, Sitapur, opposite Central Bank of India.
                </p>
              </div>
              <a
                href={DEALERSHIP.links.googleMapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#121722] aspect-[16/7] w-full">
              <iframe
                title="Shankar Automobiles Dealership Location Map"
                src={DEALERSHIP.links.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
