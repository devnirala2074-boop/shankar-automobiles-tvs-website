import React, { useState, useEffect, useCallback } from 'react';
import { X, User, Phone, Bike, HelpCircle, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useModal } from '../context/ModalContext';
import { VEHICLES } from '../data/vehicles';
import { buildWhatsAppUrl, getVehicleEnquiryMessage, isValidIndianPhone } from '../utils/whatsapp';
import { DEALERSHIP } from '../data/dealership';

export default function EnquiryModal() {
  const { enquiryOpen, closeEnquiry, enquiryVehicle } = useModal();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    queryType: 'On-Road Price Quote',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setError('');
    setFormData((prev) => ({ ...prev, vehicle: '' }));
    closeEnquiry();
  }, [closeEnquiry]);

  useEffect(() => {
    if (!enquiryOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enquiryOpen, handleClose]);

  if (!enquiryOpen) return null;

  const selectedModel = formData.vehicle || enquiryVehicle || VEHICLES[0]?.name || '';

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
    const fullNotes = `Name: ${formData.name.trim()}\nPhone: ${formData.phone.trim()}\nRequirement: ${formData.queryType}${formData.message ? `\nDetails: ${formData.message.trim()}` : ''}`;
    const waText = getVehicleEnquiryMessage(selectedModel, fullNotes);
    const url = buildWhatsAppUrl(waText);
    
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#121722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171E2C]">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Vehicle Price & Details Enquiry
            </h3>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-white">Enquiry Ready!</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              We have generated your enquiry message and directed you to WhatsApp ({DEALERSHIP.contact.phoneDisplay}). Send it to receive official Sitapur on-road pricing and current delivery schedules.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-gray-400">
              Get official Sitapur on-road pricing, color availability, or EMI calculations from <strong className="text-white">{DEALERSHIP.name}</strong>.
            </p>

            {error && (
              <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  maxLength={15}
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Vehicle Model *
                </label>
                <div className="relative">
                  <Bike className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={selectedModel}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition appearance-none"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.name} className="bg-[#121722] text-white">
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Enquiry Type
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={formData.queryType}
                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition appearance-none"
                  >
                    <option value="On-Road Price Quote" className="bg-[#121722] text-white">On-Road Price Quote</option>
                    <option value="Finance & EMI Breakdown" className="bg-[#121722] text-white">Finance & EMI Breakdown</option>
                    <option value="Stock & Color Availability" className="bg-[#121722] text-white">Stock & Color Availability</option>
                    <option value="Old Bike Exchange Valuation" className="bg-[#121722] text-white">Old Bike Exchange</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Questions / Specific Variant (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="Mention variant preference (e.g., Disc, SmartXonnect, Dual Channel ABS)..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition resize-none"
              ></textarea>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/3 py-2.5 border border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 flex items-center justify-center space-x-2 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl text-sm transition shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
