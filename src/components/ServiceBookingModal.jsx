import React, { useState, useEffect, useCallback } from 'react';
import { X, User, Phone, Wrench, Calendar, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useModal } from '../context/ModalContext';
import { buildWhatsAppUrl, getServiceBookingMessage, isValidIndianPhone } from '../utils/whatsapp';
import { DEALERSHIP } from '../data/dealership';

export default function ServiceBookingModal() {
  const { serviceOpen, closeService } = useModal();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    serviceType: 'Scheduled Periodic Service',
    preferredDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setError('');
    closeService();
  }, [closeService]);

  useEffect(() => {
    if (!serviceOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [serviceOpen, handleClose]);

  if (!serviceOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.vehicle.trim()) {
      setError('Please provide your name, phone, and TVS vehicle model.');
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#121722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171E2C]">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Book TVS Service & Maintenance
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
            <h4 className="text-xl font-bold text-white">Service Request Sent!</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your service appointment request has been directed to WhatsApp ({DEALERSHIP.contact.phoneDisplay}). Our service coordinator at Sitapur will confirm slot timing and estimated duration.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-gray-400">
              Authorized TVS Service at <strong className="text-white">{DEALERSHIP.name}</strong>, Sitapur. Genuine TVS TRU4 oil and factory warranty maintenance.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  TVS Vehicle Model *
                </label>
                <div className="relative">
                  <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jupiter 125, Apache 160"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Service Category
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                >
                  <option value="Scheduled Periodic Service" className="bg-[#121722]">Scheduled Periodic Service</option>
                  <option value="Free Service Coupon Redemption" className="bg-[#121722]">Free Service Coupon</option>
                  <option value="Engine Oil & Filter Change" className="bg-[#121722]">Engine Oil & Filter Change</option>
                  <option value="Brake & Clutch Overhaul" className="bg-[#121722]">Brake & Clutch Overhaul</option>
                  <option value="TVS iQube EV Battery / Electrical Check" className="bg-[#121722]">iQube EV Health Check</option>
                  <option value="Accidental Repair / Insurance Claim" className="bg-[#121722]">Accidental / Insurance Claim</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Issues or Specific Remarks (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="Describe any vibration, noise, cold start issue or specific part needed..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                <span>Request via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
